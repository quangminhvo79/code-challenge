# # Problem 2: Crypto Token Swap Application

A modern, responsive cryptocurrency token swap interface built with React, TypeScript, and Tailwind CSS. This application allows users to swap between different cryptocurrency tokens with real-time price calculations and balance management.

## Features

- **Token Swapping**: Swap between multiple cryptocurrency tokens (ETH, USDT, USDC, WBTC, etc.)
- **Real-time Price Calculation**: Automatic conversion rate calculation based on current token prices
- **Balance Management**: Track and update token balances after each swap
- **Token Watchlist**: View a list of available tokens with their current prices
- **Responsive UI**: Modern gradient design with smooth animations and blur effects
- **Input Validation**:
  - Numeric input validation with decimal support (up to 6 decimal places)
  - Insufficient balance detection
  - Zero and empty value handling
- **Token Switching**: Quick switch between selling and buying tokens
- **USD Value Display**: Real-time USD value calculation for both selling and buying amounts

## Tech Stack

### Core
- **React 19.1.1** - UI library
- **TypeScript** - Type safety
- **Vite 7.1.7** - Build tool and dev server

### Styling
- **Tailwind CSS 4.1.16** - Utility-first CSS framework
- **Lucide React** - Icon library

### State Management & Data Fetching
- **TanStack React Query 5.90.5** - Server state management
- **React Context API** - Wallet state management

### Utilities
- **Decimal.js** - Precise decimal arithmetic for financial calculations

### Testing
- **Vitest 4.0.3** - Unit testing framework
- **Playwright** - Browser testing
- **vitest-browser-react** - React component testing in real browsers

### Code Quality
- **ESLint 9.38.0** - Code linting
- **Prettier** - Code formatting

## Prerequisites

### Software Requirements
- **Node.js** 24.10.0 or higher
- **Yarn** package manager

## Installation

1. Clone the repository and navigate to the project directory:
```bash
cd src/problem2
```

2. Install dependencies:
```bash
yarn install
```

3. If you plan to run tests and haven't installed Playwright yet:
```bash
yarn playwright install
```

## Running the Application

### Development Mode
Start the development server with hot module replacement:
```bash
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is already in use).

## Testing

### Run All Tests
```bash
yarn test
```

### Run Browser Tests
```bash
yarn test:browser
```

The test suite includes comprehensive coverage for:
- Initial component rendering
- Token selection and switching
- Amount input and calculation
- Balance validation
- Swap functionality
- Edge cases (decimal handling, large/small numbers, etc.)
- Full integration flow

## Project Structure

```
src/
├── components/
│   ├── SwapForm/          # Main swap interface
│   │   ├── container.tsx  # Business logic
│   │   ├── view.tsx       # Presentation
│   │   ├── types.ts       # TypeScript types
│   │   └── index.ts       # Exports
│   ├── TokenInfo/         # Token information display
│   │   ├── container.tsx
│   │   ├── view.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   └── WatchList/         # Token price watchlist
│       ├── container.tsx
│       ├── view.tsx
│       └── index.ts
├── contexts/
│   └── walletContext/     # Wallet state management
│       ├── index.tsx
│       └── types.tsx
├── hooks/
│   └── use-tokens.ts      # Token data fetching hook
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles

public/
├── data/
│   └── token_prices.json  # Token price data
└── images/                # Token icons (SVG)

tests/
└── SwapForm.spec.tsx      # SwapForm component tests
```

## Component Architecture

### SwapForm
The main swap interface component that handles:
- Token selection (selling and buying)
- Amount input with validation
- Conversion rate calculation
- Swap execution
- Token switching functionality

### TokenInfo
Displays detailed information about selected tokens including:
- Token name and symbol
- Current balance
- USD value
- Token icon

### WatchList
Shows a scrollable list of available tokens with:
- Token icons
- Token symbols
- Current prices in USD

### WalletProvider
Context provider that manages:
- Token balances
- Balance updates after swaps
- Wallet state across components

## Data Flow

1. Token prices are loaded from `/public/data/token_prices.json`
2. React Query fetches and caches token data
3. WalletContext maintains token balances
4. SwapForm calculates conversion rates using Decimal.js for precision
5. On swap execution, balances are updated in WalletContext
6. TokenInfo components reflect updated balances

## Features in Detail

### Precise Decimal Calculation
The application uses Decimal.js to ensure accurate financial calculations, avoiding floating-point arithmetic errors common in JavaScript.

### Input Validation
- Only accepts numeric input
- Supports decimal values up to 6 places
- Prevents leading zeros (except for decimals like 0.5)
- Real-time validation feedback

### Balance Management
- Tracks individual token balances
- Validates sufficient balance before swaps
- Updates balances after successful swaps
- Persists balance state across component renders
