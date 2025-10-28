import React,{useState} from 'react'
import  Modal  from '@mui/material/Modal';
import MediaTable from './components/MediaTable';

const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Favorite Movies & TV Shows</h1>
        <button onClick={handleOpen}>
          Add +
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          className='bg-white'
        >
          
          <p>jhdfuidhf</p>
        </Modal>
      </header>

      <main className="max-w-6xl mx-auto mt-6">
        <MediaTable/>
      </main>
    </div>
  );
}

export default App