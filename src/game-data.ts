import { TableGameData as GameDataBase } from "sc-game-base/src/table";

export default class GameData extends GameDataBase {
    constructor(remainingTime: number) {
        super(remainingTime);
        this.playerBetCount = {};
    }
    playerBetCount: Record<string, string[]> = {};
    match: any = {}; //TODO define type later
}
