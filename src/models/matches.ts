import mongoose from "mongoose";
import gameSettings from "../game-settings";
import { Match } from "./rounds";

const modelName = `${gameSettings.name}_match`;

const Schema = new mongoose.Schema<Match>(
    {
        home: { type: String },
        away: { type: String },
        startTime: { type: Date },
    },
    {
        _id: false,
    }
);

export default mongoose.model(modelName, Schema);
