import React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/navigation';

const BasicModal = ({ open, onClose, title, description }) => {
  const router = useRouter();

  const handleClose = () => {
    onClose();
    if (typeof window !== 'undefined') {
      router.push('/Mascotas');
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <h2 id="modal-modal-title">{title}</h2>
          <p id="modal-modal-description">{description}</p>
          <Button onClick={handleClose}>Aceptar</Button>
        </div>
      </Modal>
    </div>
  )
}

export default BasicModal;
