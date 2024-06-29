import { Result } from "../models/rounds";

export type FinalSeeds = {
    serverSeed: string;
    finalHash: string;
};

export const generateResult = (finalHash: string) => {
    const result = finalHashToNumber(finalHash) % 2 === 0;
    return { home: result, away: !result };
};

const finalHashToNumber = (finalHash: string) => {
    const Hexadecimal = 16;
    return parseInt(finalHash.slice(0, 5), Hexadecimal);
};

export const getSettlementResult = (result: Result) => {
    return result;
};

export const generateRawResultForHash = () => {};
