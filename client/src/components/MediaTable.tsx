import  { useState,useRef, useEffect }  from 'react'
import { useMediaList, useDeleteMedia } from "../hooks/MediaHooks";
import { Modal, Box } from "@mui/material"
import { MediaForm } from './MediaForm';
import type { MediaItem } from '../types/MediaTypes';

// Modal styling
const modalStyle = {
  position: "absolute" ,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500, md: 600 },
  maxHeight: "90vh",
  overflow: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

interface MediaTableProps {
  search: string;
  filter: string;
}

const MediaTable = ({ search, filter }: MediaTableProps) => {
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useMediaList();

  const deleteMutation = useDeleteMedia();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
    if (!loadMoreRef.current) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    });

    observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [ hasNextPage,fetchNextPage]);

   if (isLoading) return <div>Loading...</div>;

  const items: MediaItem[] = data?.pages.flatMap((p) => p.items) ?? [];

  // ✅ Apply client-side filtering
  const filteredItems = items.filter(item => {
    // Search: match title, director, location (case-insensitive)
    const matchesSearch = 
      search === '' ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.director.toLowerCase().includes(search.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(search.toLowerCase()));

    // Filter: match type or show all
   
    
    const matchesFilter = 
      filter === 'all' || filter === '' || item.type === filter;

    return matchesSearch && matchesFilter;
  });
  return (
    <div className="bg-gray-500 shadow rounded">
        <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
            <tr>
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Director</th>
                <th className="p-2 text-left">Budget</th>
                <th className="p-2 text-left">Location</th>
                <th className="p-2 text-left">Duration</th>
                <th className="p-2 text-left">Year</th>
                <th className="p-2 text-left">Actions</th>
            </tr>
            </thead>

             <tbody>
          {filteredItems.map((m) => (
            <tr key={m.id} className="border-t border-white text-white">
              <td className="p-2">{m.title}</td>
              <td className="p-2">{m.type === "MOVIE" ? "Movie" : "TV Show"}</td>
              <td className="p-2">{m.director}</td>
              <td className="p-2">{m.budgetLabel ?? (m.budget ? m.budget : "-")}</td>
              <td className="p-2">{m.location ?? "-"}</td>
              <td className="p-2">{m.durationMin ? `${m.durationMin} min` : "-"}</td>
              <td className="p-2">{m.year ?? "-"}</td>
              <td className="p-2 ">
                {/* Implement Edit modal/drawer and Delete with confirmation */}
                <button 
                  className="mr-2 cursor-pointer bg-amber-500 px-2 py-1 text-md text-white font-semibold underline" 
                  onClick={() => {
                    setEditingItem(m);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="mr-2 cursor-pointer bg-red-500 px-2 py-1 text-md text-whitefont-semibold underline"
                  onClick={() => {
                    if(confirm(`Delete "${m.title}"?`)) deleteMutation.mutate(m.id);
                  }}
                >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>

        {filteredItems.length === 0 && (
          <div className="p-4 text-center">No media found</div>
        )}

        <div ref={loadMoreRef} className="p-4 text-center">
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll to load more" : "No more records"}
        </div>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
         
        >
          
         <Box sx={modalStyle}>
          <MediaForm onClose={() => setIsModalOpen(false)} defaultValues={editingItem ?? undefined} />
         </Box>
        </Modal>
    </div>
  )
}

export default MediaTable