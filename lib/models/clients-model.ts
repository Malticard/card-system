// models/taps.ts
import { Schema, model, models } from "mongoose";

const clientsSchema = new Schema({
    name: String,
    picture: {
        type: String,
        default: "http://via.placeholder.com/300x300"
    },
    status: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
});

const ClientsModel = models.clients || model("clients", clientsSchema);

export default ClientsModel;
