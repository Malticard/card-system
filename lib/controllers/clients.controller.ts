import { NextApiRequest, NextApiResponse } from "next";
import ClientsModel from "../models/clients-model";

export default class ClientController {
    static async indexClients(req: NextApiRequest, res: NextApiResponse) {
        try {
            const response = await ClientsModel.find({}).sort({ _id: -1 });
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
    // store the clients
    static async storeClients(req: NextApiRequest, res: NextApiResponse) {
        try {
            const response = await ClientsModel.create({
                name: req.body.name,
                picture: req.body.picture,
            });
            return res.status(200).json({ message: "Client added." });
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
    // show client details
    static async showClient(req: NextApiRequest, res: NextApiResponse) {
        try {
            const response = await ClientsModel.findById(req.query.id);
            return res.status(200).json(response);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
    // delete a client
    static async deleteClient(req: NextApiRequest, res: NextApiResponse) {
        try {
            await ClientsModel.findByIdAndDelete(req.query.id);
            return res.status(200).json({ message: "Client deleted successfully." });
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }
}