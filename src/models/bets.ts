import mongoose from "mongoose";

interface IBetBase {
    uid: string;
    name: string;

    betwin: number;
    time: Date;
    odds: Object;

    clientSeed: string;
    siteId: string;
    freeBet: boolean;

    playerId: string;
    operatorId?: string;
    roundId: number;
    paid: boolean;
    currency: string;
    rate: number;
}
interface IBet extends IBetBase {
    head: number;
    tail: number;
}

// const betBase = {
//     uid: { type: String, required: true },
//     name: { type: String, required: true },

//     betwin: { type: Number, default: 0 },
//     time: { type: Date },
//     odds: { type: Object },

//     clientSeed: { type: String, default: "" },
//     siteId: { type: String },
//     freeBet: { type: Boolean, default: false },

//     playerId: { type: String },
//     operatorId: { type: String, required: false },
//     roundId: { type: Number, default: 0, required: true },
//     paid: { type: Boolean, default: false },
// };

const bet = {} as IBet;

const bets = mongoose.model<IBet>("cointoss_bets", new mongoose.Schema(bet));

const tmpBets = mongoose.model<IBet>("cointoss_tmpbets", new mongoose.Schema(bet));

export { bets, tmpBets };

