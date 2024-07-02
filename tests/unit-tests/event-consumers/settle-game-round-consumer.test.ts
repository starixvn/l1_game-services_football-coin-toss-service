import { SettleGameRoundConsumer } from "../../../src/event-consumers";
import { TableGameDefinition } from "sc-game-base/src/table";
import gameSettings from "../../../src/game-settings";
import GameData from "../../../src/game-data";

import {
    roundResultPublisher,
    userBetResultPublisher,
    endGame,
    roundsRepository,
    betsRepository,
    tempBetsRepository,
    gameManagementApiClientFactory,
} from "./global-stubs.test";

describe("SettleGameRoundConsumer", () => {
    let consumer: SettleGameRoundConsumer;

    const mockDate = new Date();

    const mockGenerateResult = jest.fn();
    const mockSettle = jest.fn();
    const mockGenerateHash = jest.fn();

    const definition = new TableGameDefinition(gameSettings, mockGenerateResult, mockSettle, mockGenerateHash);
    const gameData = new GameData(0);

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("settleRound", () => {
        const result = { home: true, away: false };
        const match = { home: "ENG", away: "SVK", startTime: "" };

        beforeEach(() => {
            gameData.exchangeRates = { exId: 1, time: "", source: "", code: {} };
            gameData.roundId = 1;
            gameData.match = match;
            mockGenerateResult.mockReturnValueOnce(result);
            mockSettle.mockReturnValueOnce(result);
        });

        it("always generate result", async () => {
            // Arrange
            roundsRepository.create.mockReturnValueOnce({});
            mockSettleBets.mockImplementationOnce(() => {});

            // Act
            await consumer.settleRound();

            // Assert
            expect(consumer.generateResult).toHaveBeenCalled();
        });

        it("always call settle with generated result", async () => {
            // Arrange
            roundsRepository.create.mockReturnValueOnce({});
            mockSettleBets.mockImplementationOnce(() => {});

            // Act
            await consumer.settleRound();

            // Assert
            expect(consumer.definition.settle).toHaveBeenCalledWith(result);
        });

        it("always insert new round with correct value", async () => {
            // Arrange
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
            expect(roundsRepository.create).toHaveBeenCalledWith({
                id: 1,
                result: result,
                settlementResult: result,
                time: mockDate,
                exchangeRateId: 1,
                match: match,
            });
        });

        describe("when new round is created", () => {
            const newRound = {
                id: 2,
                time: new Date(),
                result: result,
                settlementResult: result,
                match,
            };

            beforeEach(() => {
                consumer.collectRoundResult = jest.fn().mockReturnValueOnce({ result: result, settlementResult: result });
                roundsRepository.create.mockResolvedValue(newRound);
            });

            it("should publish round result and winners ", async () => {
                // Arrange

                // Act
                await consumer.settleRound();

                // Assert
                expect(consumer.roundResultPublisher.publishRoundResult).toHaveBeenCalledWith({ result: result, settlementResult: result });
                expect(mockSettleBets).toHaveBeenCalledWith({
                    settlementResult: result,
                    result: result,
                    roundId: 2,
                    time: newRound.time,
                });
                expect(consumer.roundResultPublisher.publishWinners).toHaveBeenCalledWith(1, {});
                expect(consumer.gameData.roundId).toBe(3);
            });
        });
    });
});
