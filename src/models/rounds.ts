import mongoose from "mongoose";

const modelName = "footballcointoss_rounds";

export type Result = {
    home: boolean;
    away: boolean;
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

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: { type: resultSchema },
    settlementResult: { type: resultSchema },
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, require: true },
});

export default mongoose.model(modelName, Schema);
