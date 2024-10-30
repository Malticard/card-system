// models/taps.ts
import { Schema, model, models } from "mongoose";

const tapSchema = new Schema({
    tap: Number,
}, {
    timestamps: true,
});

const TapsModel = models.taps || model("taps", tapSchema);

export default TapsModel;
