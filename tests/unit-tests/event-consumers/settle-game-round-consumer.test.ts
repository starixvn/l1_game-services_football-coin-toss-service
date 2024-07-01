// @ts-ignore
import { stubMongoose, stub } from "jest-micro-auto-stub";
import mongoose from "mongoose";
import { SettleGameRoundConsumer } from "../../../src/event-consumers";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { RoundResultPublisher, UserBetResultPublisher } from "sc-game-base/src/core/event-publishers";
import { TableGameDefinition } from "sc-game-base/src/table";
import gameSettings from "../../../src/game-settings";
import GameData from "../../../src/game-data";

jest.mock("sc-game-management-client");

describe("SettleGameRoundConsumer", () => {
    let consumer: SettleGameRoundConsumer;
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

    const mockDate = new Date();
    const endGame = jest.fn();
    const gameManagementApiClientFactory = new GameManagementApiClientFactory({});
    const mockGenerateResult = jest.fn();
    const mockSettle = jest.fn();
    const mockGenerateHash = jest.fn();

    const definition = new TableGameDefinition(gameSettings, mockGenerateResult, mockSettle, mockGenerateHash);
    const gameData = new GameData(0);
    gameData.exchangeRates = { exId: 1, time: "", source: "", code: {} };

    const mockSettleBets = jest.fn();

    beforeEach(() => {
        jest.spyOn(global, "Date").mockImplementation(() => mockDate);
        consumer = new SettleGameRoundConsumer({
            definition,
            gameData,
            roundResultPublisher,
            userBetResultPublisher,
            endGame,
            roundsRepository,
            betsRepository,
            tempBetsRepository,
            gameManagementApiClientFactory,
        });

        consumer.generateResult = mockGenerateResult;
        consumer.settleBets = mockSettleBets;
    });

    it("should generate result and settle", async () => {
        // Arrange
        const result = { home: true, away: false };
        const match = { home: "ENG", away: "SVK", startTime: "" };
        gameData.match = match;
        mockGenerateResult.mockReturnValueOnce(result);
        mockSettle.mockReturnValueOnce(result);
        const newRound = {
            id: 2,
            time: new Date(),
            result: result,
            settlementResult: result,
            match,
        };
        roundsRepository.create.mockReturnValueOnce(newRound);
        mockSettleBets.mockImplementationOnce(() => {});

        // Act
        await consumer.settleRound();

        // Assert
        expect(consumer.generateResult).toHaveBeenCalled();
        expect(consumer.definition.settle).toHaveBeenCalledWith(result);
        expect(roundsRepository.create).toHaveBeenCalledWith({
            id: 1,
            result: result,
            settlementResult: result,
            time: mockDate,
            exchangeRateId: 1,
            match: match,
        });
    });
});
