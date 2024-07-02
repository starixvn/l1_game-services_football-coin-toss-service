import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { initUserSession } from "../helper/helper";
import { socketOptionsFunc } from "../_stubs/test-data";
import appConfigs from "../../../build/app-configs.IGT";

const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("when getPfInfo", () => {
    let client;

    beforeEach(async () => {
        client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        const sendSignInInterval = setInterval(() => {
            client.sendSignInEvent();
        }, 500);

        await client.handleSignedInEvent();

        client.sendInGameEvent();

        clearInterval(sendSignInInterval);
    });

    afterEach(() => {
        client.close();
        client = null;
    });

    it("should return pfInfo", async () => {
        // Arrange
        client.emit("getPfInfo", { drawId: 8 });
        const pfInfo = {
            clientSeeds: [],
            roundId: 1,
            drawId: 8,
            serverSeedHash: "e555dc6bd3d9b819377537887e93288add86d66dd0399e9aef3fdadf1e8e19ff",
            serverSeed:
                '{"random":"62","remain":"1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:17:18:19:20:21:22:24:25:26:27:28:29:30:31:32:33:35:36:37:38:39:40:42:43:44:45:46:47:49:50:52:53:54:55:56:57:58:60:61:62:63:64:65:66:67:68:69:70:71:72:73:74:75","secret":"kpcNFFkcCAEf4A$]c([SMokdheG0mGsm"}',
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
        };

        // Act
        const actual = await client.handleGameEvent((data) => data.clientSeedDeaway);

        // Assert
        expect(actual.pfResult.serverSeedHash).toEqual(pfInfo.serverSeedHash);
        expect(JSON.stringify(actual.pfResult.serverSeed)).toEqual(JSON.stringify(pfInfo.serverSeed));
        expect(actual.clientSeedDeaway).toEqual({});
    });
});
