import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '@/lib/mongodb';

import UserController from '@/lib/controllers/users.controller';

const { storeUser } = UserController;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'POST') {
        await storeUser(req, res);
    }
}