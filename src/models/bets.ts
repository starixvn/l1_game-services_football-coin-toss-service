import mongoose from "mongoose";
import { BetSchema } from "sc-game-base/src/core/models";

const bet = {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
};
const betModel = { ...BetSchema.betBaseSchema, ...bet };
const tempBetModel = { ...BetSchema.tempBetBaseSchema, ...bet };

const bets = mongoose.model("cointoss_bets", new mongoose.Schema(betModel));

const tmpBets = mongoose.model("cointoss_tmpbets", new mongoose.Schema(tempBetModel));

export { bets, tmpBets };
