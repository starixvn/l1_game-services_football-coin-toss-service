import gameSetting from "./game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { home: 3000, away: 3000 },
    odds: { home: 2, away: 2 },
    botenabled: false,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
    choices_maxbet: { home: 3000, away: 3000 },
};

const tempRoundResult = [
    { drawId: 1, ball: 1 },
    { drawId: 2, ball: 2 },
    { drawId: 3, ball: 3 },
    { drawId: 4, ball: 4 },
    { drawId: 5, ball: 5 },
    { drawId: 6, ball: 6 },
    { drawId: 7, ball: 7 },
];

const pfResults = [
    {
        clientSeeds: [],
        roundId: 1,
        drawId: 8,
        serverSeedHash: "e555dc6bd3d9b819377537887e93288add86d66dd0399e9aef3fdadf1e8e19ff",
        encryptedServerSeed: {
            iv: "7f7ab9d4ca5488e642c6031e505e7e56",
            content:
                "bb2aadf029c452e8535eb35b90f26464a3274e42cef469c890fb8e8d52d2a48709acec8cf0335fbabb56e17847eb647a7a0c968717a8d9dd2650b6904031dba12b18847f23d808fc7eef31f34adc7e0d2a76936c088d8bde253e5a4d51833c788dda5154554d4f22f658804e3830f26a3dce9cb6496ab681e1f21a090113f709bfa2c2328df859d60766223749fac7abeb22ec47bc41ace9beae5de0a43a8edcbfddbcb198cd7df4c644ec05865a1894ffda8c7f2a5d310060f0439b1bae4d7bdb0e1b15200086b4feca03a72ecc1a8e2e53d2ecf4b001e717db343bf6f039af435544fab18eed4565341626cc279a2e1650231a61a577f6ff39e6eac92fcbe55edc62bf79ba024a49",
        },
        finalHash:
            "dfb6b901abe52730f3ce7f17563f071e683b521ddaeab1cc4a3b3c43b5f4e65e6d713b7414924e40b52677f2d979729623d00cd325398ec9d3f9551eb52778c2",
        mergeClientSeed: "",
        mergeSeed:
            '{"random":"62","remain":"1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:17:18:19:20:21:22:24:25:26:27:28:29:30:31:32:33:35:36:37:38:39:40:42:43:44:45:46:47:49:50:52:53:54:55:56:57:58:60:61:62:63:64:65:66:67:68:69:70:71:72:73:74:75","secret":"kpcNFFkcCAEf4A$]c([SMokdheG0mGsm"}',
    },
];

const roundsData = [
    {
        id: 1,
        result: [...tempRoundResult],
        settlementResult: [
            { drawId: 1, over: false, under: true, odd: true, even: false },
            { drawId: 2, over: false, under: true, odd: true, even: false },
            { drawId: 3, over: false, under: true, odd: true, even: false },
            { drawId: 4, over: false, under: true, odd: true, even: false },
            { drawId: 5, over: false, under: true, odd: true, even: false },
            { drawId: 6, over: false, under: true, odd: true, even: false },
            { drawId: 7, over: false, under: true, odd: true, even: false },
        ],
        drawId: 7,
        ended: false,
        exchangeRateId: 1,
    },
];

const userBetData = (uid) => {
    return [
        {
            uid: uid,
            drawId: 2,
            freeBet: false,
            roundId: 1,
            betwin: 195.6,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: gameConfig.odds,
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: true,
            over: 120,
            odd: 140,
            totalAmount: 260,
        },
        {
            uid: uid,
            drawId: 8,
            freeBet: false,
            roundId: 1,
            betwin: 0,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: { over: 2, under: 2, odd: 2, even: 2 },
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: false,
            over: 120,
            odd: 140,
            totalAmount: 260,
        },
        {
            uid: uid,
            drawId: 8,
            freeBet: false,
            roundId: 1,
            betwin: 0,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: { over: 2, under: 2, odd: 2, even: 2 },
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: false,
            under: 120,
            even: 140,
            totalAmount: 260,
        },
    ];
};

const userBetLogData = (uid) => {
    return [
        {
            amount: 196.8,
            rebet: false,
            roundId: 1,
            drawId: 8,
            uid: uid,
            name: "Tornado45411",
            time: "2024-03-06T02:08:29.598Z",
            choice: "over",
            siteId: "4100300",
            currency: "INH",
            rate: 1000,
            operatorId: "ONEworksVGCash",
            playerId: 666,
        },
        {
            amount: 20,
            rebet: false,
            roundId: 1,
            drawId: 2,
            uid: uid,
            name: "Bird4252",
            time: "2024-03-06T02:10:48.915Z",
            choice: "under",
            siteId: "4100300",
            currency: "INH",
            rate: 1000,
            operatorId: "ONEworksVGCash",
            playerId: 2609,
        },
    ];
};

const promotions = [
    {
        gameId: gameSetting.id,
        startDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
        endDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15 + 6)),
        isDaily: false,
        odds: gameConfig.odds,
        status: "enabled",
    },
];

export { currencyData, game, gameConfig, pfResults, promotions, roundsData, socketOptionsFunc, userBetData, userBetLogData };
