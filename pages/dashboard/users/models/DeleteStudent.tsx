import { Staff } from '@/interfaces/StaffModel';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteStudent = ({ deleteModalShow, deleting, currentStaff, setDeleteModalShow, handleSaveDelete }: { deleting: boolean; deleteModalShow: boolean; currentStaff: Staff | null; setDeleteModalShow: React.Dispatch<React.SetStateAction<boolean>>; handleSaveDelete: () => void }) => {
    return (
        <>
            <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentStaff && (
                        <p>Are you sure you want to delete {currentStaff?.staff_fname} {currentStaff?.staff_lname}?</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={deleting} onClick={() => setDeleteModalShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={deleting} onClick={handleSaveDelete}>
                        {deleting ? `Deleting...` : `Save Changes`}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteStudent;