import type { NextApiRequest, NextApiResponse } from 'next'
import TapsController from "@/lib/controllers/tap.controller";
import dbConnect from '@/lib/mongodb';

const { indexTaps, storeTaps } = TapsController

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'GET') {
        await indexTaps(req, res);
    } else if (req.method === 'POST') {
        await storeTaps(req, res);
    }
}