import moment from "moment";
import { calculateEndTime, getMatchStatus, getNextMatch } from "../../../src/helpers/match-helper";
import { Match } from "../../../src/models/rounds";

describe("Match Helper", () => {
    describe("calculateEndTime", () => {
        it("should calculate the end time correctly", () => {
            // Arrange
            const startTime = moment("2024-06-30T10:00:00");

            // Act
            const endTime = calculateEndTime(startTime);

            // Assert
            expect(endTime.format()).toBe(moment("2024-06-30T12:00:00").format());
        });
    });

    describe("getMatchStatus", () => {
        it('should return "inProgress" if current time is between start and end time', () => {
            // Arrange
            const startTime = moment("2024-06-30T10:00:00");
            const currentTime = moment("2024-06-30T11:00:00");

            // Act
            const status = getMatchStatus(startTime, currentTime);

            // Assert
            expect(status).toBe("inProgress");
        });

        it('should return "future" if current time is before start time', () => {
            // Arrange
            const startTime = moment("2024-06-30T10:00:00");
            const currentTime = moment("2024-06-30T09:00:00");

            // Act
            const status = getMatchStatus(startTime, currentTime);

            // Assert
            expect(status).toBe("future");
        });

        it('should return "past" if current time is after end time', () => {
            // Arrange
            const startTime = moment("2024-06-30T10:00:00");
            const currentTime = moment("2024-06-30T13:00:00");

            // Act
            const status = getMatchStatus(startTime, currentTime);

            // Assert
            expect(status).toBe("past");
        });
    });

    describe("getNextMatch", () => {
        const testMatches = [
            { home: "SUI", away: "ITA", startTime: "2024-06-29T16:00:00Z" },
            { home: "GER", away: "DEN", startTime: "2024-06-29T19:00:00Z" },
            { home: "ENG", away: "SVK", startTime: "2024-06-30T16:00:00Z" },
            { home: "ESP", away: "GEO", startTime: "2024-06-30T19:00:00Z" },
            { home: "FRA", away: "BEL", startTime: "2024-07-01T16:00:00Z" },
            { home: "POR", away: "SVN", startTime: "2024-07-01T19:00:00Z" },
            { home: "ROU", away: "NED", startTime: "2024-07-02T16:00:00Z" },
            { home: "AUT", away: "TUR", startTime: "2024-07-02T19:00:00Z" },
        ];

        it("should return default match if matches array is empty", () => {
            // Arrange
            const matches: Match[] = [];

            // Act
            const nextMatch = getNextMatch(matches);

            // Assert
            expect(nextMatch).toEqual({ home: "home", away: "away", startTime: "" });
        });

        describe("when have in-progress match", () => {
            it("should return the in-progress match", () => {
                // Arrange
                jest.spyOn(moment, "now").mockReturnValue(moment("2024-06-30T16:00:00Z").valueOf());

                // Act
                const nextMatch = getNextMatch(testMatches);

                // Assert
                expect(nextMatch).toEqual({ home: "ENG", away: "SVK", startTime: "2024-06-30T16:00:00Z", status: "inProgress" });
            });
        });

        describe("when NO in-progress match", () => {
            describe("when have future match", () => {
                it("should return the future match", () => {
                    // Arrange
                    jest.spyOn(moment, "now").mockReturnValue(moment("2024-06-30T09:30:00").valueOf());

                    // Act
                    const nextMatch = getNextMatch(testMatches);

                    // Assert
                    expect(nextMatch).toEqual({ home: "ENG", away: "SVK", startTime: "2024-06-30T16:00:00Z", status: "future" });
                });
            });

            describe("when NO future match", () => {
                it("should return the latest match", () => {
                    // Arrange
                    jest.spyOn(moment, "now").mockReturnValue(moment("2024-07-02T21:01:00Z").valueOf());

                    // Act
                    const nextMatch = getNextMatch(testMatches);

                    // Assert
                    expect(nextMatch).toEqual({ home: "AUT", away: "TUR", startTime: "2024-07-02T19:00:00Z", status: "past" });
                });
            });
        });
    });
});
