import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../models/user-model";

export default class UserController {
    static async indexUsers(req: NextApiRequest, res: NextApiResponse): Promise<any> {
        try {
            const users = await UserModel.find({}).sort({ _id: -1 });
            res.status(200).json(users);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    // function to store user
    static async storeUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            return res.status(200).json({ message: name + " created successfully." })
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    // delete user from dv
    static async deleteUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const response = await UserModel.findByIdAndDelete(req.query.id);
            return res.status(200).json({ message: response.message });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
    // update user
    static async updateUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const response = await UserModel.findByIdAndUpdate(
                req.query.id,
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    }
                },
                { new: true } // Return the updated document
            );

            if (!response) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}