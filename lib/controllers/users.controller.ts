import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../models/user-model";
import bcrypt from "bcrypt";
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
            // first check is user already exists
            const { name, email, password, type } = req.body;
            const user = await UserModel.findOne({ email: email });
            if (user) {
                return res.status(401).json({ message: "User already exists" });
            } else {
                // console.log(req.body);
                const hashedPassword = bcrypt.hashSync(password, 10);
                await UserModel.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    type: type
                });
                return res.status(200).json({ message: name + " created successfully." })
            }

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
        const { name, email, password, type } = req.body;
        try {
            const hashedPassword = bcrypt.hashSync(password, 15);
            const response = await UserModel.findByIdAndUpdate(
                req.query.id,
                {
                    $set: {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        type: type
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
    // show user profile
    static async showUser(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { id } = req.query;
            const user = await UserModel.findById(id);
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}