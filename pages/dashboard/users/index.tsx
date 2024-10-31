import React from 'react';
import PageHeader from '@/shared/layout-components/page-header/page-header';
import { Col, Row } from 'react-bootstrap';
import Seo from '@/shared/layout-components/seo/seo';
// import StaffDataTable from './StaffDatatable';

import LoaderComponent from '@/pages/dashboard/components/LoaderComponent';
import useSWR from 'swr';
import UserDataTable from './UserDataTable';
import axios from 'axios';
import { User } from '@/interfaces/UserInterface';

const Checkout = () => {
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  // Fetch staff and roles data using SWR with automatic revalidation
  const fetchUsers = async (): Promise<User[]> => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: '/api/users',
    };
    const response = await axios.request(config)
    console.log(response.data);
    return response.data;
  }
  const { data: user, error: userError, isValidating: usersLoading, mutate: mutateUser } = useSWR(
    'fetchUsers',
    () => fetchUsers(),
    {
      revalidateOnFocus: true, // Revalidate when window gets focus
      revalidateOnReconnect: true, // Revalidate when reconnecting
      refreshInterval: 0, // Poll every 0 seconds
      dedupingInterval: 5000, // Deduplicate requests for 5 seconds
      onError: (err) => console.error('Error fetching staff:', err)
    }
  );

  // Update data manually
  const updates = async () => {
    const newUsers = await fetchUsers();
    mutateUser(newUsers, true);
    console.log(newUsers);
  };

  // Handle page change for pagination
  const onChangePage = async (page: number) => {
    try {
      const newUsers = await fetchUsers();
      mutateUser(newUsers, false);
    } catch (error) {
      console.error("Error fetching new users data:", error);
    }
  };
  if (usersLoading) {
    return <LoaderComponent />;
  }
  // If loading or error, show loader or error message
  if (userError) return <div>Error loading data: {userError?.message}</div>;

  return (
    <>
      <Seo title="Users" />
      <PageHeader
        title="Users"
        item="Cards"
        active_item="Users"
        buttonText="Add User"
        onTap={() => setAddModalShow(true)}
      />
      {/* Row */}
      <Row>
        <Col xl={12}>

          <UserDataTable
            loadingClasses={isUploading}
            handleUpdates={updates}
            addModalShow={addModalShow}
            setAddModalShow={setAddModalShow}
            updatePage={onChangePage}
            users={user ?? []}
          />

          {/* <LoaderComponent />
          // )} */}
        </Col>
      </Row>
      {/* End Row */}
    </>
  );
};

Checkout.layout = 'Contentlayout';

export default Checkout;
