// models/User.ts
import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

const UserModel = models.users || model("users", userSchema);

export default UserModel;
