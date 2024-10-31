import { DashboardItem } from "@/interfaces/DashboardItem";
import ClientsModel from "../models/clients-model";
import TapsModel from "../models/taps-model";
import UserModel from "../models/user-model";
import dbConnect from "../mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export class DashboardController {
    // fetching data
    static async getStats(req: NextApiRequest, res: NextApiResponse) {
        // await dbConnect();
        try {
            const users = await UserModel.find({ type: 0 }).countDocuments();
            const clients = await ClientsModel.find({}).countDocuments();
            const taps = await TapsModel.find({}).countDocuments();
            const records = [{
                label: "Users",
                value: users,
                icon: "user",
                page: "/dashboard/users"
            }, {
                label: "Clients",
                value: clients,
                icon: "user",
                page: "/dashboard/clients"
            }, {
                label: "Taps",
                value: taps,
                icon: "taps",
                page: "/dashboard/"
            }];
            return res.status(200).json(records);
        } catch (error: any) {
            console.log("Dashboard error", error);
            return res.status(500).json({ message: error.message }); // Return an empty array in case of error
        }
    }
}