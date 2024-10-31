import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '@/lib/mongodb';
import { DashboardController } from '@/lib/controllers/dashboard.controller';

const { getStats } = DashboardController;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await dbConnect();
    if (req.method === 'GET') {
        await getStats(req, res);
    }
}