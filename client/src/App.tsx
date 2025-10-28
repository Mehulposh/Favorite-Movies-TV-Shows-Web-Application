import {useState} from 'react'
import { Modal, Box } from "@mui/material"
import MediaTable from './components/MediaTable';
import { MediaForm } from './components/MediaForm';

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


const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <div className='flex justify-between items-center w-full'>
          <h1 className="text-2xl font-bold">Favorite Movies & TV Shows</h1>
          <button 
            className='bg-green-500 px-3 py-2 rounded text-white cursor-pointer'
            onClick={handleOpen}>
            Add +
          </button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
         
        >
          
         <Box sx={modalStyle}>
          <MediaForm onClose={handleClose}/>
         </Box>
        </Modal>
      </header>

      <main className="max-w-6xl mx-auto mt-6">
        <MediaTable/>
      </main>
    </div>
  );
}

export default App