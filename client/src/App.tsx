import {useState} from 'react'
import { Modal, Box } from "@mui/material"
import MediaTable from './components/MediaTable';
import { MediaForm } from './components/MediaForm';
import Navbar from './components/navBar';

/**
 * Modal styling configuration for MUI Box
 * Uses responsive widths and centers the modal on screen
 */
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


/**
 * Main application component
 * Manages global state for:
 * - Modal visibility (for adding new media)
 * - Search query (for filtering media by text)
 * - Media type filter (MOVIE, TV_SHOW, or all)
 */

const App = () => {
  // State for controlling the "Add Media" modal
  const [open, setOpen] = useState(false);

   // State for search input (passed to Navbar and MediaTable)
  const [search, setSearch] = useState('')

  // State for media type filter (passed to Navbar and MediaTable)
  const [filter, setFilter] = useState('')

  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      {/* Top navigation bar with search and filter controls */}
      <Navbar 
        search={search} 
        setSearch={setSearch} 
        filter={filter} 
        setFilter={setFilter}
      />

       {/* Page header with title and "Add" button */}
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        
          <h1 className="text-2xl font-bold">Favorite Movies & TV Shows</h1>

          {/* Button to open the "Add Media" modal */}
          <button 
            className='bg-green-500 px-3 py-2 rounded text-white cursor-pointer'
            onClick={handleOpen}>
            Add +
          </button>
        {/* Modal for creating new media entries */}
        <Modal
          open={open}
          onClose={handleClose}
          // Note: Modal is placed inside header for DOM structure,
          // but visually appears on top of entire page due to fixed positioning
         
        >
          
         <Box sx={modalStyle}>
          <MediaForm onClose={handleClose}/>
         </Box>
        </Modal>
      </header>

      {/* Main content area containing the media table */}
      <main className="max-w-6xl mx-auto mt-6">
        <MediaTable search={search} filter={filter}/>
      </main>
    </div>
  );
}

export default App