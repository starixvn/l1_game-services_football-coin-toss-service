# Football Coin Toss Service - Architecture Documentation

## Overview

The Football Coin Toss Service is a real-time gaming service that implements a coin toss game using football team match data. Players bet on either the "home" or "away" team, and the game determines winners through a provably fair random coin toss mechanism.

## 🏗️ Source Code Structure

### Root Directory Structure

```
football-coin-toss-service/
├── src/                    # TypeScript source code
├── build/                  # Compiled JavaScript output
├── configs/                # Environment-specific configurations
├── tests/                  # Unit and integration tests
├── coverage/               # Test coverage reports
├── reports/                # Test result reports
├── rtp/                    # Return to Player statistics
└── node_modules/           # Dependencies
```

### Core Source Code (`/src`)

#### 🎮 Application Entry Point

-   **`app.ts`** - Main application bootstrap that initializes the game engine
-   **`app-configs.ts`** - Base application configuration settings
-   **`coin-toss-container-registry.ts`** - Dependency injection container setup

#### ⚙️ Game Configuration

-   **`game-settings.ts`** - Core game settings (durations, betting options, RTP)
-   **`game-data.ts`** - Runtime game state management
-   **`constants.ts`** - Global constants and betting choices

#### 🗃️ Data Models (`/src/models`)

-   **`rounds.ts`** - Game round data structure and MongoDB schema
-   **`bets.ts`** - Player betting records and temporary bets
-   **`results.ts`** - Game results storage
-   **`matches.ts`** - Football match information
-   **`bet-logs.ts`** - Detailed betting transaction logs

#### 🔄 Event System (`/src/event-consumers` & `/src/event-publishers`)

**Consumers (Input Events):**

-   **`place-bet-consumer.ts`** - Handles player bet placement
-   **`in-game-consumer.ts`** - Manages players joining the game
-   **`out-game-consumer.ts`** - Handles player disconnections
-   **`user-sign-in-consumer.ts`** - User authentication events
-   **`settle-game-round-consumer.ts`** - Game round settlement
-   **`round-result-consumer.ts`** - Result processing

**Publishers (Output Events):**

-   **`round-result-publisher.ts`** - Broadcasts game results
-   **`running-round-info-publisher.ts`** - Real-time game state updates
-   **`game-status-publisher.ts`** - Game status notifications

#### ⏰ Background Jobs (`/src/crons`)

-   **`game-cron.ts`** - Main game lifecycle management
-   **`bot.ts`** - Automated betting bot for game activity
-   **`process-bet-queue.ts`** - Bet processing queue management

#### 🛠️ Utilities (`/src/helpers`)

-   **`result-helper.ts`** - Provably fair random result generation
-   **`match-helper.ts`** - Football match data processing
-   **`bet-percentage.ts`** - Betting statistics calculations

#### 📊 Query APIs (`/src/query-apis`)

-   **`round-query.ts`** - Game round history queries
-   **`history-query.ts`** - Player betting history

## 📦 Dependencies

### Core Dependencies

| Package           | Version | Purpose                                |
| ----------------- | ------- | -------------------------------------- |
| **sc-game-base**  | 5.2.2   | Core gaming framework and base classes |
| **awilix**        | 8.0.0   | Dependency injection container         |
| **mongoose**      | 5.13.22 | MongoDB object modeling                |
| **moment**        | 2.30.1  | Date and time manipulation             |
| **extensionless** | 1.9.6   | Module resolution for Node.js          |

### Development Dependencies

| Package        | Version | Purpose                 |
| -------------- | ------- | ----------------------- |
| **typescript** | ^5.3.3  | TypeScript compiler     |
| **jest**       | ^29.7.0 | Testing framework       |
| **tsx**        | ^4.7.0  | TypeScript execution    |
| **nodemon**    | ^3.0.3  | Development auto-reload |
| **husky**      | ^9.0.6  | Git hooks               |

### Framework-Specific Dependencies

| Package                               | Version | Purpose                     |
| ------------------------------------- | ------- | --------------------------- |
| **sc-base-database**                  | ^2.2.0  | Database utilities          |
| **sc-game-management-client**         | ^0.1.0  | Game management integration |
| **sc-game-service-integration-utils** | ^2.1.0  | Service integration helpers |

## 🎯 Game Rules and Flow

### Current Game Configuration

```typescript
{
    id: 93,
    name: "FootballCoinToss",
    durations: {
        wholeRound: 29,      // Total round duration (seconds)
        flipTheCoin: 3,      // Coin flip animation (seconds)
        placingBets: 20,     // Betting period (seconds)
        lockingBet: 3,       // Bet locking period (seconds)
    },
    choices: ["home", "away"],           // Available betting options
    provablyFair: true,                  // Uses provably fair RNG
    hedgeBetGroups: [["home", "away"]]   // Opposing bet groups
}
```

### Game Flow Lifecycle

1. **Round Initialization**

    - Game cron starts new round
    - Fetches next football match data
    - Resets player bet counts
    - Broadcasts round start

2. **Betting Phase (20 seconds)**

    - Players place bets on "home" or "away"
    - Bet validation through `PlaceBetConsumer`
    - Real-time bet updates via publishers

3. **Bet Locking (3 seconds)**

    - No new bets accepted
    - Final bet processing
    - Preparation for result generation

4. **Coin Flip Animation (3 seconds)**

    - Visual coin toss representation
    - Provably fair result generation
    - Result calculation using hash algorithm

5. **Result Settlement**
    - Winners determined (home=true/false, away=!home)
    - Payouts calculated and distributed
    - Results stored in database
    - Next round preparation

### Provably Fair Algorithm

The game uses a provably fair system:

```typescript
const generateResult = (finalHash: string) => {
    const result = finalHashToNumber(finalHash) % 2 === 0;
    return { home: result, away: !result };
};
```

## 🚀 How to Create a New Game with Familiar Rules

### Step 1: Understand the Base Framework

The service is built on the **sc-game-base** framework, which provides:

-   Table game engine (`TableGameDefinition`)
-   Event system (consumers/publishers)
-   Dependency injection
-   Database integration
-   Provably fair system

### Step 2: Create New Game Settings

Create a new game settings file similar to `game-settings.ts`:

```typescript
// src/new-game-settings.ts
import { BET_CHOICES } from "./constants";

export default {
    id: 94, // Unique game ID
    name: "NewGameName", // Game identifier
    durations: {
        wholeRound: 30, // Adjust timing as needed
        specialPhase: 5, // Add game-specific phases
        bettingPeriod: 20,
        lockingBet: 3,
    },
    choices: ["option1", "option2", "option3"], // Define betting options
    choicesMapper: { option1: 1, option2: 2, option3: 3 },
    hedgeBetGroups: [["option1", "option2"]], // Define opposing groups
    numberOfRoundHistory: 100,
    provablyFair: true,
    // Add game-specific settings
    gameSpecificConfig: {
        multipliers: { option1: 2.0, option2: 1.5, option3: 3.0 },
    },
};
```

### Step 3: Extend Game Data Class

Customize the game state by extending the base class:

```typescript
// src/new-game-data.ts
import { TableGameData as GameDataBase } from "sc-game-base/src/table";

export default class NewGameData extends GameDataBase {
    constructor(remainingTime: number) {
        super(remainingTime);
        this.gameSpecificData = {};
    }

    // Add game-specific state
    gameSpecificData: Record<string, any> = {};
    currentMultiplier: number = 1.0;
    specialFeatureActive: boolean = false;
}
```

### Step 4: Implement Result Generation Logic

Create custom result generation in the helpers:

```typescript
// src/helpers/new-game-result-helper.ts
export const generateResult = (finalHash: string) => {
    // Implement your game's result logic
    const randomValue = finalHashToNumber(finalHash);

    // Example: Three-option game with weighted probabilities
    const threshold1 = 40; // 40% chance
    const threshold2 = 70; // 30% chance (70-40)
    const remainder = 100; // 30% chance (100-70)

    const percentage = randomValue % 100;

    if (percentage < threshold1) {
        return { option1: true, option2: false, option3: false };
    } else if (percentage < threshold2) {
        return { option1: false, option2: true, option3: false };
    } else {
        return { option1: false, option2: false, option3: true };
    }
};

export const getSettlementResult = (result: any) => {
    // Add any settlement-specific logic
    return result;
};
```

### Step 5: Customize Event Consumers

Extend base consumers for game-specific logic:

```typescript
// src/event-consumers/new-game-place-bet-consumer.ts
import { PlaceBetConsumer as PlaceBetConsumerBase } from "sc-game-base/src/core/event-consumers";
import gameSettings from "../new-game-settings";

export default class NewGamePlaceBetConsumer extends PlaceBetConsumerBase {
    composeBettingTimeValidationCriteria(roundId: number) {
        const configs = this.gameData.gameConfigs;
        return [
            {
                failure: !configs.enabled,
                notice: this.getNoticeObj("Game is currently disabled"),
            },
            // Add game-specific validation rules
            {
                failure: this.isSpecialFeatureConflict(roundId),
                notice: this.getNoticeObj("Cannot bet during special feature"),
            },
            // ... other validation rules
        ];
    }

    private isSpecialFeatureConflict(roundId: number): boolean {
        // Implement game-specific betting restrictions
        return false;
    }
}
```

### Step 6: Update Database Models

Create new database schemas if needed:

```typescript
// src/models/new-game-rounds.ts
import mongoose from "mongoose";

const modelName = "newgame_rounds";

export type NewGameResult = {
    option1: boolean;
    option2: boolean;
    option3: boolean;
    multiplier?: number;
};

const resultSchema = new mongoose.Schema<NewGameResult>(
    {
        option1: { type: Boolean, default: false },
        option2: { type: Boolean, default: false },
        option3: { type: Boolean, default: false },
        multiplier: { type: Number },
    },
    { _id: false }
);

const Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    result: { type: resultSchema },
    settlementResult: { type: resultSchema },
    time: { type: Date, default: new Date() },
    exchangeRateId: { type: Number, require: true },
    // Add game-specific fields
    specialFeatureTriggered: { type: Boolean, default: false },
});

export default mongoose.model(modelName, Schema);
```

### Step 7: Create Container Registry

Set up dependency injection:

```typescript
// src/new-game-container-registry.ts
import { TableContainerRegistry } from "sc-game-base/src/table";
import NewGamePlaceBetConsumer from "./event-consumers/new-game-place-bet-consumer";
// Import other game-specific classes

export default class NewGameContainerRegistry extends TableContainerRegistry {
    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(NewGamePlaceBetConsumer).singleton(),
            // Register other game-specific consumers
        });
    }

    // Override other registration methods as needed
}
```

### Step 8: Update Application Bootstrap

Modify the main application file:

```typescript
// src/app.ts
import { Core, Table } from "sc-game-base";
import appConfigs from "./app-configs";
import NewGameContainerRegistry from "./new-game-container-registry";
import NewGameData from "./new-game-data";
import newGameSettings from "./new-game-settings";
import newGameResultHelper from "./helpers/new-game-result-helper";

const run = async () => {
    const definition = new Table.TableGameDefinition(
        newGameSettings,
        newGameResultHelper.generateResult,
        newGameResultHelper.getSettlementResult,
        newGameResultHelper.generateRawResultForHash
    );

    const gameData = new NewGameData(newGameSettings.durations.wholeRound);
    const container = new NewGameContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(newGameSettings.name, appConfigs);

    await app.run();
    await app.startGame(container);
};

run();
```

### Step 9: Testing and Configuration

1. **Update package.json** - Change the name and version
2. **Update Docker configuration** - Adjust ports if needed
3. **Environment configs** - Update configuration files in `/configs`
4. **Add tests** - Create unit and integration tests
5. **Database migration** - Ensure proper database setup

### Step 10: Deployment Considerations

1. **Database Collections** - New game will create separate collections
2. **API Endpoints** - Game-specific queries will be automatically available
3. **Socket Events** - Client applications need to handle new event types
4. **Monitoring** - Update logging and metrics for the new game

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start in watch mode
npm run build           # Compile TypeScript
npm run stats           # Run RTP statistics

# Testing
npm run test            # Unit tests
npm run test-coverage   # With coverage
npm run integration-test # Integration tests

# Production
node build/app.js       # Start compiled version
```

## 🐳 Docker Support

The service includes full Docker support with multi-stage builds:

-   Base image: Node.js 20.9.0 Alpine
-   Production optimized with mod-pruner
-   Exposes port 5000
-   Uses extensionless loader for ES modules

This architecture provides a solid foundation for creating new casino-style games while maintaining the provably fair gaming standards and real-time capabilities of the platform.
