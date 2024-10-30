import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../models/user-model";
import bcrypt from "bcrypt";

export default class AuthController {
    static async login(req: NextApiRequest, res: NextApiResponse) {
        try {
            const { email, password } = req.body;
            // check if user email exists
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                res.status(403).json({ message: "User does not exist" });
            } else {
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if (passwordMatch) {
                    res.status(200).json(user);
                } else {
                    res.status(403).json({ message: "Password mismatch" });
                }
            }

        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
    // register user
    static async registerUser(req: NextApiRequest, res: NextApiResponse) {

    }
}