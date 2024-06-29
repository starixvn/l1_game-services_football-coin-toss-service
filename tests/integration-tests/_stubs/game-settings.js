export default {
    id: 80,
    name: "CoinToss",
    configName: "cointoss",
    durations: {
        wholeRound: 29,
        flipTheCoin: 3,
        placingBets: 20,
        lockingBet: 3,
    },
    choices: ["home", "away"],
    choicesMapper: { home: 1, away: 2 },
    hedgeBetGroups: [["home", "away"]],
    provablyFair: true,
};
