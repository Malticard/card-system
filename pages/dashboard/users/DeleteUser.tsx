import { User } from '@/interfaces/UserInterface';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteUser = ({ deleteModalShow, deleting, currentUser, setDeleteModalShow, handleSaveDelete }: { deleting: boolean; deleteModalShow: boolean; currentUser: User | null; setDeleteModalShow: React.Dispatch<React.SetStateAction<boolean>>; handleSaveDelete: () => void }) => {
    return (
        <>
            <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentUser && (
                        <p>Are you sure you want to delete {currentUser?.name}</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={deleting} onClick={() => setDeleteModalShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={deleting} onClick={handleSaveDelete}>
                        {deleting ? `Deleting...` : `Delete`}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteUser;