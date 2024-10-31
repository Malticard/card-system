import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import FormElement from '../components/FormElement';
import axios from 'axios';
import { User } from '@/interfaces/UserInterface';

const EditUser = ({
    editModalShow,
    currentUser,
    setCurrentUser,
    setEditModalShow,
    handleSaveEdit
}: {
    editModalShow: boolean;
    currentUser: User | null;
    setEditModalShow: React.Dispatch<React.SetStateAction<boolean>>,
    setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
    handleSaveEdit: () => void
}) => {
    const [userData, setUserData] = React.useState<User | null>(currentUser);
    const [message, setMessage] = React.useState<string>('');
    const [posting, setPosting] = React.useState(false);

    React.useEffect(() => {
        if (currentUser) {
            setUserData(currentUser);
        }
    }, [currentUser]);

    const saveUser = async (data: FormData): Promise<void> => {
        try {
            let config = {
                method: 'PUT',
                maxBodyLength: Infinity,
                url: '/api/users/user/' + currentUser?._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config);
            if (response.status === 200) {
                setMessage('Staff added successfully');
                setPosting(false);
                handleSaveEdit(); // Call save handler to trigger any updates
            }
        } catch (error: any) {
            console.log("Catch error", error);
            setPosting(false);
        }
    }

    const handleSubmitData = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData) return;

        setMessage('');
        setPosting(true);
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        saveUser(formData);
    }

    return (
        <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit user details</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmitData}>
                <Modal.Body>
                    <FormElement
                        value={userData?.name || ''}
                        label='Name'
                        onChange={(e) => setUserData({
                            ...userData!,
                            name: e.target.value
                        })}
                    />
                    <br />
                    <FormElement
                        label='Email'
                        value={userData?.email || ''}
                        type='email'
                        onChange={(e) => setUserData({
                            ...userData!,
                            email: e.target.value
                        })}
                    />
                    <br />
                    <FormElement
                        label='Phone Number'
                        value={userData?.phone ? `${userData.phone}` : ''}
                        type='number'
                        onChange={(e) => setUserData({
                            ...userData!,
                            phone: parseInt(e.target.value)
                        })}
                    />
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" disabled={posting} onClick={() => setEditModalShow(false)}>
                        Close
                    </Button>
                    <Button disabled={posting} type='submit' variant="primary">
                        {posting ? `Saving...` : `Save Changes`}
                    </Button>
                </Modal.Footer>
                {message && <p className="mt-4 bg-[#ee2020cb] p-2 text-white font-semibold text-center">{message}</p>}
            </Form>
        </Modal>
    );
};

export default EditUser;
