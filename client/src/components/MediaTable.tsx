import  { useState,useRef, useEffect }  from 'react'
import { useMediaList, useDeleteMedia } from "../hooks/MediaHooks";
import { Modal, Box } from "@mui/material"
import { MediaForm } from './MediaForm';

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

const MediaTable = () => {
  const [editingItem, setEditingItem] = useState<any | null>(null);
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
  }, [loadMoreRef.current, hasNextPage]);

   if (isLoading) return <div>Loading...</div>;

  const items = data?.pages.flatMap((p: any) => p.items) ?? [];


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
          {items.map((m: any) => (
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

        <div ref={loadMoreRef} className="p-4 text-center">
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll to load more" : "No more records"}
        </div>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
         
        >
          
         <Box sx={modalStyle}>
          <MediaForm onClose={() => setIsModalOpen(false)} defaultValues={editingItem} />
         </Box>
        </Modal>
    </div>
  )
}

export default MediaTable