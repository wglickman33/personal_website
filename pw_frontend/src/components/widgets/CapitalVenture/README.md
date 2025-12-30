# Capital Venture

An idle clicker game widget inspired by AdVenture Capitalist, themed around building a portfolio of creative and business ventures.

## File Structure

```
CapitalVenture/
├── CapitalVenture.tsx          # Main component
├── CapitalVenture.scss         # Styling
├── types/
│   └── capitalVentureTypes.ts  # TypeScript interfaces
├── data/
│   └── capitalVentureData.ts   # Initial game state and venture definitions
├── utils/
│   ├── bigNumber.ts         # BigNumber implementation for large numbers
│   ├── economy.ts           # Economic calculations (costs, income, prestige)
│   └── storage.ts           # LocalStorage save/load utilities
└── hooks/
    ├── useGameLoop.ts       # Game loop using requestAnimationFrame
    └── useLocalSave.ts      # Auto-save hook
```

## Core Formulas

### Venture Cost Calculation

The cost to buy `N` levels starting from level `L` with base cost `C` and growth rate `G`:

```
cost(L, N) = C * (G^L + G^(L+1) + ... + G^(L+N-1))
```

For geometric series:
```
cost(L, N) = C * (G^L) * (G^N - 1) / (G - 1)
```

If `G = 1` (no growth):
```
cost(L, N) = C * N
```

### Income Per Second

For a venture at level `L` with base income `I`:

```
incomePerSec = I * L * milestoneMultiplier * upgradeMultiplier * globalMultiplier * (1 + prestigeMultiplier)
```

### Prestige Points

Prestige points are calculated from total earned capital:

```
prestigePoints = floor(sqrt(totalEarned / PRESTIGE_SCALE))
```

Where `PRESTIGE_SCALE = 1e12` (1 trillion).

### Prestige Multiplier

Each prestige point provides a permanent multiplier:

```
prestigeMultiplier = prestigePoints * PRESTIGE_MULTIPLIER_PER_POINT
```

Where `PRESTIGE_MULTIPLIER_PER_POINT = 0.02` (2% per point).

## Tuning Knobs

### Economy Constants (`utils/economy.ts`)

- `PRESTIGE_SCALE`: Base scale for prestige calculation (default: `1e12`)
- `PRESTIGE_MULTIPLIER_PER_POINT`: Multiplier per prestige point (default: `0.02`)
- `MIN_PRESTIGE_TOTAL_EARNED`: Minimum total earned to prestige (default: `1e15`)

### Venture Properties (`data/capitalVentureData.ts`)

For each venture, you can adjust:

- `baseCost`: Starting cost (increases exponentially)
- `costGrowth`: Cost multiplier per level (1.15-1.4 range recommended)
- `baseIncomePerSec`: Base income per second per level
- `unlockAtTotalEarned`: When the venture becomes available
- `milestoneMultipliers`: Array of `{ level, multiplier }` for income boosts

### Buy Modes

- `x1`, `x5`, `x10`, `x100`: Buy exactly N levels (or as many as affordable)
- `Next`: Buy to next milestone (10, 25, 50, 100, 200, 500, 1000)
- `Max`: Buy as many levels as affordable

## Adding a New Venture

1. Open `data/capitalVentureData.ts`
2. Add a new object to the `createInitialVentures()` array:

```typescript
{
  id: 'unique-id',
  name: 'Venture Name',
  description: 'What it does',
  level: 0,
  baseCost: BN.create(1000000),        // Starting cost
  costGrowth: 1.25,                     // Cost multiplier per level
  baseIncomePerSec: BN.create(10000),   // Base income per level
  incomeGrowth: 1.0,                    // Income growth (usually 1.0)
  unlockAtTotalEarned: BN.create(1000000), // Unlock threshold
  hasManager: false,
  milestoneMultipliers: [
    { level: 25, multiplier: 2 },
    { level: 50, multiplier: 3 },
    { level: 100, multiplier: 5 }
  ]
}
```

## Adding a New Upgrade

1. Open `data/capitalVentureData.ts`
2. Add a new object to the `createInitialUpgrades()` array:

```typescript
{
  id: 'unique-upgrade-id',
  name: 'Upgrade Name',
  description: 'What it does',
  cost: BN.create(100000),
  unlocked: false,
  unlockAtTotalEarned: BN.create(100000), // Optional
  unlockAtVentureLevel: {                 // Optional
    ventureId: 'venture-id',
    level: 25
  },
  type: 'global', // or 'venture'
  ventureId: 'venture-id', // Required if type is 'venture'
  multiplier: 2 // Multiplier effect
}
```

## BigNumber Implementation

The game uses a custom BigNumber system to handle very large numbers without floating-point precision issues. Numbers are stored as `{ mantissa, exponent }` where:

- `mantissa` is normalized to [1, 10) range
- `exponent` is the power of 10

This allows accurate calculations up to extremely large values (10^30+).

### Formatting

Numbers are formatted with suffixes:
- K (thousands)
- M (millions)
- B (billions)
- T (trillions)
- Qa, Qi, Sx, Sp, Oc, No, Dc... (quadrillions and beyond)

## Game Loop

The game uses `requestAnimationFrame` for smooth 60fps updates. Income is calculated based on delta time:

```typescript
income = incomePerSec * deltaTime
```

Delta time is clamped to 0.1 seconds to prevent large jumps if the tab is inactive.

## Storage

Game state is automatically saved to `localStorage` every 2 seconds and on important events (buy, prestige). The storage key is `pw:capital-venture:state`.

State includes:
- Current capital
- Total earned (lifetime)
- All venture levels and manager status
- All upgrade unlock status
- Prestige points
- Buy mode preference

## No Offline Earnings

The game does NOT grant retroactive income when the app is reopened. This is intentional to keep the game balanced and prevent exploitation.

