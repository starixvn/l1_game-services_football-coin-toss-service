import Chance from "chance";
import { SeedHelper, ServerSeedHelper } from "sc-game-base/src/core/helpers";
import { generateSeed } from "sc-pf-client-seed/dist";
import { generateResult, getSettlementResult } from "../src/helpers/result-helper";
const chance = new Chance();

const betChoices = ["home", "away"];

const odds = {
    home: 1.96,
    away: 1.96,
};

const generateClientSeeds = () => {
    return [generateSeed(), generateSeed(), generateSeed(), generateSeed(), generateSeed()];
};

const exportRtpResult = (randomMode = 1, numberOfRuns = 1_000_000, choices = betChoices) => {
    const current = Date.now();

    const resultStat = {
        home: 0,
        away: 0,
    };

    const resultProbability = {
        home: 0,
        away: 0,
    };

    let totalWinAmount = 0;
    let winCount = 0;
    let totalBetAmount = 0;
    const winStreaks = {
        home: {},
        away: {},
    };

    let winStreaksProbability = {
        home: {},
        away: {},
    };
    let curChoice;
    let curStreak = 0;

    for (let index = 0; index < numberOfRuns; index++) {
        const betAmount = chance.pickone([1, 5, 10, 50, 100]);
        const choice = chance.pickone(choices);
        totalBetAmount += betAmount;

        const clientSeeds = generateClientSeeds();
        const serverSeed = ServerSeedHelper.generateServerSeed(randomMode);
        const mergeClientSeed = SeedHelper.getMergeClientSeed(clientSeeds);
        const mergeSeed = serverSeed + mergeClientSeed;
        const finalHash = SeedHelper.getSHA512Hash(mergeSeed);
        const result = generateResult(finalHash);
        const settlementResult = getSettlementResult(result);

        const winningChoice = Object.keys(settlementResult).find((choice) => settlementResult[choice]);
        Object.keys(settlementResult).forEach((key) => settlementResult[key] && resultStat[key]++);

        if (choice === winningChoice) {
            let winAmount = odds[choice] * betAmount;

            winCount++;
            totalWinAmount += winAmount;
        }

        if (curChoice != winningChoice) {
            if (curStreak >= 4) {
                winStreaks[curChoice][curStreak] = winStreaks[curChoice][curStreak] ? winStreaks[curChoice][curStreak] + 1 : 1;
                const num = winStreaks[curChoice][curStreak] / numberOfRuns;
                winStreaksProbability[curChoice][curStreak] = (Math.round(num * 100) / 100).toFixed(3);
            }

            curChoice = winningChoice;
            curStreak = 1;
        } else {
            curStreak++;
        }
    }
    resultProbability.home = resultStat.home / numberOfRuns;
    resultProbability.away = resultStat.away / numberOfRuns;
    console.log(`randomMode: ${randomMode}`);
    console.log("resultStat");
    console.log(resultStat);
    console.log("resultStatProbability");
    console.log(resultProbability);
    console.log("winStreaks");
    console.log(winStreaks);
    console.log("winStreaksProbability");
    console.log(winStreaksProbability);
    console.log("RTP");
    console.log({ rtp: totalWinAmount / totalBetAmount });
    const currentEnd = Date.now();
    console.log(`Run ${numberOfRuns} rounds in ${currentEnd - current}ms`);
};

const randomMode = 1;
const rounds = 100_000;

exportRtpResult(randomMode, rounds);
