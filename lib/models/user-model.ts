// models/User.ts
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: "http://via.placeholder.com/300x300",
        required: false,
    },
    type: {
        type: Number,
        default: 0,
    },
});

const UserModel = models.users || model("users", userSchema);

export default UserModel;
