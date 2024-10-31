import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import dynamic from "next/dynamic";
import { IconEdit, IconTrash } from '@/public/assets/icon-fonts/tabler-icons/icons-react';
import AddUser from './AddUser';
import { User } from '@/interfaces/UserInterface';
import DeleteUser from './DeleteUser';
import EditUser from './EditUser';
import axios from 'axios';


const DataTableExtensions: any = dynamic(() => import('react-data-table-component-extensions'), { ssr: false });

export default function UserDataTable({ users, handleUpdates, addModalShow, setAddModalShow, updatePage }: { handleUpdates: () => void; addModalShow: boolean; setAddModalShow: React.Dispatch<React.SetStateAction<boolean>>, loadingClasses: boolean; updatePage: (value: number) => void; users: User[]; }) {
    const [data, setData] = React.useState<User[]>(users);
    // State to hold pagination details
    // const [currentPage, setCurrentPage] = React.useState(staff.currentPage || 1);
    // const [pageSize] = React.useState(staff.pageSize || 10);
    // const [totalDocuments, setTotalDocuments] = React.useState(staff.totalDocuments || 0);
    const [editModalShow, setEditModalShow] = React.useState(false);
    const [deleteModalShow, setDeleteModalShow] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState<User>({} as User);

    // Update the data when the students prop changes
    const columns: any = [
        {
            name: "User Profile".toLocaleUpperCase(),
            cell: (row: User) => (<img className='m-2 rounded-full w-[3em] h-[3em]' src={row.picture} width={50} height={50} alt='' />),
            ignoreRowClick: true,
            allowOverflow: true,
        },
        {
            name: "Name".toLocaleUpperCase(),
            selector: (row: User) => [row.name],
            sortable: true
        },
        {
            name: "Type".toLocaleUpperCase(),
            selector: (row: User) => [row.type == 1 ? 'Admin' : 'Normal User'],
            sortable: true
        },
        {
            name: "Contact".toLocaleUpperCase(),
            selector: (row: User) => [row.phone],
            sortable: true
        },
        {
            name: "Actions".toLocaleUpperCase(),
            cell: (row: User) => (
                <>
                    <Button variant="primary" className='mx-1' size="sm" onClick={() => handleEdit(row)}><IconEdit className='text-sm w-5 h-5' /></Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row)}><IconTrash className='text-sm w-5 h-5' /></Button>
                </>
            ),
            ignoreRowClick: true,
            button: true,
        }
    ];
    // Handle the "Edit" button click
    const handleEdit = (user: User) => {
        setCurrentUser(user);
        setEditModalShow(true);  // Show the edit modal
    };
    // Handle the "Delete" button click
    const handleDelete = (data: User) => {
        setDeleteModalShow(true)
        setCurrentUser(data);
    };
    // handle saving
    const handleSave = (dat: User) => {
        // console.log("Save the changes for student", dat);
        setAddModalShow(false);
        setData([dat, ...data]);
        handleUpdates();
    };
    // Handle saving the edited student (you can call an API here)
    const handleSaveEdit = () => {
        console.log("Save the changes for student", currentUser);
        setEditModalShow(false);
        handleUpdates();

    }; // Handle saving the edited student (you can call an API here)
    const handleSaveDelete = () => {
        setDeleting(true);
        axios.delete(`/api/users/user/${currentUser?._id}`).then((res) => {
            setDeleting(false);
            setDeleteModalShow(false);
            handleUpdates();
        }).catch((err) => {
            setDeleting(false);
            console.log("error data", err);
            setDeleteModalShow(false);
            handleUpdates();
        });


    };
    // Function to handle page change
    const handlePageChange = (page: number) => {
        // setCurrentPage(page);
        updatePage(page);
    };
    const tableDatas = {
        columns,
        data,
    };
    return (
        <>
            <DataTableExtensions {...tableDatas} >
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    paginationServer
                    // paginationTotalRows={totalDocuments}
                    // paginationDefaultPage={currentPage}
                    // paginationPerPage={pageSize}
                    onChangePage={handlePageChange}
                />
            </DataTableExtensions>
            {/* Modal for editing student */}
            <EditUser editModalShow={editModalShow} currentUser={currentUser} setCurrentUser={setCurrentUser} setEditModalShow={setEditModalShow} handleSaveEdit={handleSaveEdit} />
            {/* modal to handle deleting */}
            <DeleteUser deleteModalShow={deleteModalShow} deleting={deleting} currentUser={currentUser} setDeleteModalShow={setDeleteModalShow} handleSaveDelete={handleSaveDelete} />
            {/* Student data */}
            <AddUser addModalShow={addModalShow} setAddModalShow={setAddModalShow} handleSave={handleSave} />
        </>

    );
}