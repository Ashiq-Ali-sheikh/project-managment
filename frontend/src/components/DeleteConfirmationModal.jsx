
import React from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm ,isLoading}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        Are you sure you want to delete this project?
      </Modal.Body>
      <Modal.Footer className="bg-dark">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
         {isLoading? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />:"Delete"} 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
