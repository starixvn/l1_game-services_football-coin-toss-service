import { Table } from "sc-game-base";
import GameData from "../game-data";
import MatchConfig from "../match-configs/matches";

import { getNextMatch } from "../helpers/match-helper";

export default class GameCron extends Table.Crons.TableGameCron {
    resetForNewRound() {
        super.resetForNewRound();
        (this.gameData as GameData).playerBetCount = {};

        const match = getNextMatch(MatchConfig.matches);
        (this.gameData as GameData).match = { home: match.home, away: match.away, startTime: "" };
    }
}
