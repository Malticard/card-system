import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '@/lib/mongodb';
import ClientController from '@/lib/controllers/clients.controller';

const { indexClients, storeClients } = ClientController;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'GET') {
        await indexClients(req, res);
    } else if (req.method === 'POST') {
        await storeClients(req, res);
    }
}