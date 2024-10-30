import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb';
import ClientController from '@/lib/controllers/clients.controller';

const { showClient, deleteClient } = ClientController

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'GET') {
        await showClient(req, res);
    } else if (req.method === 'DELETE') {
        await deleteClient(req, res);
    } else if (req.method === 'PUT' || req.method === 'PATCH') {

    }
}