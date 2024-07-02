import { Table } from "sc-game-base";
import GameData from "../game-data";

import { getNextMatch } from "../helpers/match-helper";
import { RoundResultConsumer } from "../event-consumers";

export default class GameCron extends Table.Crons.TableGameCron {
    resetForNewRound() {
        super.resetForNewRound();
        (this.gameData as GameData).playerBetCount = {};
    }

    override async getSettingForNewRound(): Promise<void> {
        await super.getSettingForNewRound();
        const matches = await (this.roundResultConsumer as RoundResultConsumer).getMatchList();
        const match = getNextMatch(matches);
        (this.gameData as GameData).match = { home: match.home, away: match.away, startTime: "" };
    }
}
