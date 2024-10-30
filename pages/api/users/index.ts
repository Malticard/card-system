import type { NextApiRequest, NextApiResponse } from 'next'
import UsersController from "@/lib/controllers/users.controller";
import dbConnect from '@/lib/mongodb';

const { indexUsers, storeUser } = UsersController

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'GET') {
        await indexUsers(req, res);
    } else if (req.method === 'POST') {
        await storeUser(req, res);
    }
}