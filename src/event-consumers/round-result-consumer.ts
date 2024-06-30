import { RoundResultConsumer as RoundResultConsumerBase } from "sc-game-base/src/core/event-consumers";
import { Core, Table } from "sc-game-base";
import GameData from "../game-data";
import { Match } from "../models/rounds";
import mongoose from "mongoose";

export default class RoundResultConsumer extends RoundResultConsumerBase {
    matchRepository: mongoose.Model<Match>;

    constructor(
        gameData: GameData,
        definition: Table.TableGameDefinition,
        roundResultPublisher: Core.BaseEventPublishers.RoundResultPublisher,
        resultsRepository: any,
        provablyFairConsumer: Core.BaseEventConsumers.ProvablyFairConsumer,
        matchRepository: mongoose.Model<Match>
    ) {
        super(gameData, definition, roundResultPublisher, resultsRepository, provablyFairConsumer);
        this.matchRepository = matchRepository;
    }

    async getMatchList(): Promise<Match[]> {
        const matchList = await this.matchRepository
            .find({}, {}, { sort: { startTime: 1 } })
            .lean()
            .exec();

        return matchList;
    }
}
