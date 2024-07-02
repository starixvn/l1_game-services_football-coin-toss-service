import { helpers } from "sc-common";
import { PlaceBetConsumer as PlaceBetConsumerBase } from "sc-game-base/src/core/event-consumers";
import gameSettings from "../game-settings";

export default class PlaceBetConsumer extends PlaceBetConsumerBase {
    composeBettingTimeValidationCriteria(roundId: number): { failure: boolean; notice: any }[] {
        const configs = this.gameData.gameConfigs;
        return [
            {
                failure: !configs.enabled,
                notice: this.getNoticeObj(helpers.noticeHelper.placeBetNextRound),
            },
            {
                failure: roundId !== this.gameData.roundId,
                notice: this.getNoticeObj(helpers.noticeHelper.invalidBet, { gameRoundId: roundId }),
            },
            {
                failure:
                    this.gameData.remainingTime >= this.definition.durations.placingBets &&
                    this.gameData.remainingTime <= this.definition.durations.placingBets + gameSettings.durations.flipTheCoin,
                notice: this.getNoticeObj(helpers.noticeHelper.cannotPlaceBet),
            },
            {
                failure:
                    this.gameData.remainingTime < this.definition.durations.lockingBet ||
                    this.gameData.remainingTime > this.definition.durations.placingBets + gameSettings.durations.flipTheCoin,
                notice: this.getNoticeObj(helpers.noticeHelper.placeBetNextRound),
            },
        ];
    }
}
