// @ts-ignore
import { stubMongoose, stub } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { RoundResultPublisher, UserBetResultPublisher } from "sc-game-base/src/core/event-publishers";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
jest.mock("sc-game-management-client");

/** @type {UserRoundResultPublisher}*/
const roundResultPublisher = stub(RoundResultPublisher);

/** @type {UserBetResultPublisher}*/
const userBetResultPublisher = stub(UserBetResultPublisher);

/** @type {mongoose.Model}*/
const roundsRepository = stubMongoose(mongoose.Model);
/** @type {mongoose.Model}*/
const betsRepository = stubMongoose(mongoose.Model);
/** @type {mongoose.Model}*/
const tempBetsRepository = stubMongoose(mongoose.Model);

const endGame = jest.fn();
const gameManagementApiClientFactory = new GameManagementApiClientFactory({});

export {
    roundResultPublisher,
    userBetResultPublisher,
    roundsRepository,
    betsRepository,
    tempBetsRepository,
    endGame,
    gameManagementApiClientFactory,
};
