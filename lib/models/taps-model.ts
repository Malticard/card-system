// models/taps.ts
import { Schema, model, models } from "mongoose";

const tapSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: "clients",
        required: true,
    },
    tap: Number,
}, {
    timestamps: true,
});

const TapsModel = models.taps || model("taps", tapSchema);

export default TapsModel;
