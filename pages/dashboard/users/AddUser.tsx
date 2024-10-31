
import React from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import FormElement from '../components/FormElement';
import axios from 'axios';
import { User } from '@/interfaces/UserInterface';


const AddUser = ({ addModalShow, setAddModalShow, handleSave }: { addModalShow: boolean; setAddModalShow: React.Dispatch<React.SetStateAction<boolean>>, handleSave: (user: User) => void }) => {

    const [userData, setUserData] = React.useState({} as User);
    // const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [message, setMessage] = React.useState<string>('');
    const [posting, setPosting] = React.useState(false);
    const saveUser = async (data: FormData): Promise<void> => {
        try {
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: '/api/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config)
            console.log(response);

            if (response.status === 200) {
                setMessage('Staff added successfully');
                handleSave(response.data);
                setPosting(false)
            }

            // const response = await axios.post(`/api/users`, data);
            // if (response.status === 200) {
            //     setMessage('Staff added successfully');
            //     handleSave(response.data);
            //     setPosting(false)
            // } else {
            //     setMessage('Something went wrong');
            // }
        } catch (error: any) {
            console.log("Catch error", error);
        }
    }
    // function to handle submission
    const handleSubmitData = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('')
        setPosting(true);
        const formData = new FormData();
        Object.entries(userData).forEach(([key, value]) => {
            formData.append(key, value as string);
        });
        formData.append('password', 'password');
        saveUser(formData);
    }
    return (
        <>
            <Modal show={addModalShow} onHide={() => setAddModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmitData}>
                    <Modal.Body>
                        <FormElement
                            value={userData.name}
                            label='Name'
                            onChange={(e) => setUserData({
                                ...userData,
                                name: e.target.value
                            })} />
                        <br />

                        <FormElement label='Email'
                            value={userData.email}
                            type='email'
                            onChange={(e) => setUserData({
                                ...userData,
                                email: e.target.value
                            })} />
                        <br />
                        <FormElement label='Phone Number'
                            value={`${userData.phone}`}
                            type='number'
                            onChange={(e) => setUserData({
                                ...userData,
                                phone: parseInt(e.target.value)
                            })} />
                        <br />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" disabled={posting} onClick={() => setAddModalShow(false)}>
                            Close
                        </Button>
                        <Button disabled={posting} type='submit' variant="primary">
                            {posting == false ? `Save Changes` : `Saving...`}
                        </Button>
                    </Modal.Footer>
                    {message && <p className="mt-4 bg-[#ee2020cb] p-2 text-white font-semibold text-center">{message}</p>}
                </Form>
            </Modal>
        </>
    );
};

export default AddUser;