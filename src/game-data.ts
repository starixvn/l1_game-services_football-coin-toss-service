import { TableGameData as GameDataBase } from "sc-game-base/src/table";
import { Match } from "./models/rounds";

export default class GameData extends GameDataBase {
    constructor(remainingTime: number) {
        super(remainingTime);
        this.playerBetCount = {};
    }
    playerBetCount: Record<string, string[]> = {};
    match: Match = { home: "", away: "", startTime: "" };
}
