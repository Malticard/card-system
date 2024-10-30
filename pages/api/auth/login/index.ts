import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '@/lib/mongodb';
import AuthController from '@/lib/controllers/auth.controller';

const { login } = AuthController;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'POST') {
        await login(req, res);
    }
}