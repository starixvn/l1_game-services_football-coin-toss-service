import { Table } from "sc-game-base";
import GameData from "../game-data";
import MatchConfig from "../match-configs/matches";

export default class GameCron extends Table.Crons.TableGameCron {
    resetForNewRound() {
        super.resetForNewRound();
        (this.gameData as GameData).playerBetCount = {};

        //TODO map with time
        const match = MatchConfig.matches.pop();
        (this.gameData as GameData).match = { home: match?.home, away: match?.away };
    }
}
