import { BET_CHOICES } from "./constants";

export default {
    id: 93,
    name: "FootballCoinToss",
    durations: {
        wholeRound: 29,
        flipTheCoin: 3,
        placingBets: 20,
        lockingBet: 3,
    },
    choices: Object.values(BET_CHOICES),
    choicesMapper: { home: 1, away: 2 },
    hedgeBetGroups: [[BET_CHOICES.home, BET_CHOICES.away]],
    numberOfRoundHistory: 100,
    provablyFair: true,
    botSettings: {
        ratio: { homeOption: 50, awayOption: 50 },
        homeOption: [BET_CHOICES.home],
        awayOption: [BET_CHOICES.away],
    },
};
