import { stub } from "jest-auto-stub";
import { Core } from "sc-game-base";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { TableGameDefinition } from "sc-game-base/src/table";
import { TableInGameConsumer } from "sc-game-base/src/table/event-consumers";
import { InGameConsumer } from "../../../src/event-consumers";
import GameData from "../../../src/game-data";
import helper from "../../../src/helpers";

describe("InGameConsumer test", () => {
    let consumer: InGameConsumer;
    const definition = stub<TableGameDefinition>();
    const gameData = stub<GameData>();
    const roundQuery = stub<Core.QueryApis.RoundQuery>();
    const publisher = stub<Core.BaseEventPublishers.BaseEventPublisher>();
    const getBalance = jest.fn();
    const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();

    beforeEach(() => {
        consumer = new InGameConsumer(definition, gameData, roundQuery, publisher, getBalance, gameManagementApiClientFactory);
    });

    it("inherit InGameConsumer of sc-number-game-base", () => {
        expect(consumer instanceof TableInGameConsumer);
    });

    describe("getUserBetPercentage", () => {
        helper.betPercentage = { roundUserBetPercentage: jest.fn(), calculateUserBetPercentage: jest.fn() };

        (helper.betPercentage.calculateUserBetPercentage as jest.Mock).mockReturnValue({
            percentage: {
                home: 66.6,
                away: 33.3,
            },
        });

        it("should return correct", () => {
            // act
            const actual = consumer.getUserBetPercentage({ home: ["111", "113"], away: ["112"] });

            // assert
            expect(actual).toStrictEqual({ home: 66, away: 34 });
        });
    });
});
