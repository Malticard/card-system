import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
    const { id } = useParams();
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
};

export default Page;