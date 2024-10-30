import { NextApiRequest, NextApiResponse } from "next";
import TapsModel from "../models/taps-model";

export default class TapController {
    static async indexTaps(req: NextApiRequest, res: NextApiResponse) {
        try {
            const tapsResponse = await TapsModel.find().sort({ _id: -1 });
            return res.status(200).json(tapsResponse)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
    // Function to increment page tap count
    static async storeTaps(req: NextApiRequest, res: NextApiResponse) {
        try {
            // Find the existing document or create it if it doesn't exist
            const result = await TapsModel.findOneAndUpdate(
                {},                    // Empty filter to target a single document
                { $inc: { tap: 1 } },  // Increment 'tap' field by 1
                { new: true, upsert: true, setDefaultsOnInsert: true } // Options
            );

            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}