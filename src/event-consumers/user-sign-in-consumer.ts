import { Core, Table } from "sc-game-base";
import { UserInfos } from "sc-game-management-client";
import { Socket } from "socket.io";

export default class UserSignInConsumer extends Core.BaseEventConsumers.UserSignInConsumer {
    constructor(
        definition: Table.TableGameDefinition,
        gameData: Table.TableGameData,
        userSignInPublisher: Table.EventPublishers.TableUserSignInPublisher,
        playGamePermissionValidator: any,
        appConfigs: Object,
        gameManagementApiClientFactory: any
    ) {
        super(gameData, userSignInPublisher, playGamePermissionValidator, appConfigs, gameManagementApiClientFactory);

        this.definition = definition;
    }

    definition: Table.TableGameDefinition;

    handleSignInSuccess(socketClient: Socket, userInfo: UserInfos, userSession: any) {
        const userData = {
            UID: userSession.userId,
            profile: { name: userInfo.name, minBet: userInfo.minBet, maxBet: userInfo.maxBet },
            session: userSession,
            socketClient,
        };

        userSession.characterName = userInfo.name;
        this.gameData.realPlayers[socketClient.id] = userData;

        socketClient.emit("signedIn");

        if (this.isEnable()) {
            (this.userSignInPublisher as Table.EventPublishers.TableUserSignInPublisher).publishToGameMessage(
                socketClient,
                this.definition.name
            );
        }
    }

    isEnable() {
        const configs = this.gameData.gameConfigs;
        const gameDisabled = !configs?.enabled;
        const disabled = gameDisabled || this.gameData.delayStartTime > 0;

        return !disabled;
    }
}
