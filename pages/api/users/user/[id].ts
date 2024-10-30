import type { NextApiRequest, NextApiResponse } from 'next'
import UsersController from "@/lib/controllers/users.controller";
import dbConnect from '@/lib/mongodb';

const { deleteUser, showUser, updateUser } = UsersController

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'DELETE') {
        await deleteUser(req, res);
    } else if (req.method === 'UPDATE' || req.method === 'PATCH' || req.method === 'PUT') {
        await updateUser(req, res);
    } else if (req.method === 'GET') {
        await showUser(req, res);
    }
}

