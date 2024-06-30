import mongoose from "mongoose";

const modelName = "footballcointoss_rounds";

export type Result = {
    home: boolean;
    away: boolean;
};

export type Match = {
    home: string;
    away: string;
};

const resultSchema = new mongoose.Schema<Result>(
    {
        home: { type: Boolean, default: false },
        away: { type: Boolean, default: false },
    },
    {
        _id: false,
    }
);

const matchSchema = new mongoose.Schema<Match>(
    {
        home: { type: String },
        away: { type: String },
    },
    {
        _id: false,
    }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: { type: resultSchema },
    settlementResult: { type: resultSchema },
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, require: true },
    match: { type: matchSchema },
});

export default mongoose.model(modelName, Schema);
