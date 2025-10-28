import  { useState,useRef, useEffect }  from 'react'
import { useMediaList, useDeleteMedia } from "../hooks/MediaHooks";
import { Modal, Box } from "@mui/material"
import { MediaForm } from './MediaForm';
import type { MediaItem } from '../types/MediaTypes';
import { BudgetFormatter } from '../utils/BudgetFormatter';

// Modal styling configuration for edit form
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
  search: string; // Search query for filtering by title, director, or location
  filter: string; // Filter by media type: 'all', 'MOVIE', or 'TV_SHOW'
}

const MediaTable = ({ search, filter }: MediaTableProps) => {
   // State for managing edit modal
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch media list with infinite scroll support
  const {
    data,
    isLoading,
    fetchNextPage, // Function to load next page
    hasNextPage,   // Boolean indicating if more pages exist
    isFetchingNextPage // Loading state for next page
  } = useMediaList();

  // Mutation hook for deleting media items
  const deleteMutation = useDeleteMedia();

  // Refs for implementing infinite scroll with Intersection Observer
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /**
   * Set up Intersection Observer for infinite scroll
   * Automatically fetches next page when user scrolls to the bottom
   */
  useEffect(() => {
    if (!loadMoreRef.current) return;

    // Disconnect existing observer before creating a new one
    if (observerRef.current) observerRef.current.disconnect();

    // Create new Intersection Observer
    observerRef.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // When the load-more element is visible and more pages exist, fetch next page
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    });

    // Start observing the load-more element
    observerRef.current.observe(loadMoreRef.current);

    // Cleanup: disconnect observer when component unmounts
    return () => observerRef.current?.disconnect();
  }, [ hasNextPage,fetchNextPage]);
  
  // Show loading state on initial data fetch
  if (isLoading) return <div>Loading...</div>;

  // Flatten all pages into a single array of media items
  const items: MediaItem[] = data?.pages.flatMap((p) => p.items) ?? [];

  // Apply client-side filtering
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

    // Item must match both search and filter criteria
    return matchesSearch && matchesFilter;
  });
  return (
    <div className="bg-gray-500 shadow rounded">
      {/* Media items table */}
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

              {/* Display human-readable type */}
              <td className="p-2">{m.type === "MOVIE" ? "Movie" : "TV Show"}</td>
              <td className="p-2">{m.director}</td>

              {/* Show budget label if available, otherwise numeric budget, or "-" */}
              <td className="p-2">{BudgetFormatter(m.budget,m.budgetLabel)}</td>

              {/* Display location or fallback to "-" if not provided */}
              <td className="p-2">{m.location ?? "-"}</td>

               {/* Format duration with "min" suffix or show "-" */}
              <td className="p-2">{m.durationMin ? `${m.durationMin} min` : "-"}</td>
              <td className="p-2">{m.year ?? "-"}</td>

              {/* Action buttons for edit and delete */}
              <td className="p-2 ">
                 {/* Edit button - opens modal with pre-filled form */}
                <button 
                  className="mr-2 cursor-pointer bg-amber-500 px-2 py-1 text-md text-white font-semibold underline" 
                  onClick={() => {
                    setEditingItem(m);
                    setIsModalOpen(true);
                  }}
                >
                  Edit
                </button>

                {/* Delete button - shows confirmation dialog before deletion */}
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
        
         {/* Empty state message when no items match filters */}
        {filteredItems.length === 0 && (
          <div className="p-4 text-center">No media found</div>
        )}

         {/* Infinite scroll trigger element */}
        <div ref={loadMoreRef} className="p-4 text-center">
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Scroll to load more" : "No more records"}
        </div>

         {/* Edit Modal - only shown when editing an item */}
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >          
         <Box sx={modalStyle}>
          {/* Pass existing item data as defaultValues for edit mode */}
          <MediaForm onClose={() => setIsModalOpen(false)} defaultValues={editingItem ?? undefined} />
         </Box>
        </Modal>
    </div>
  )
}

export default MediaTable