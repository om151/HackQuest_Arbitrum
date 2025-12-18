# ArbiLearn Proofs

> **Learn about Arbitrum. Earn verifiable on-chain proofs.**

A fully functional dApp where users complete interactive learning challenges about Arbitrum and claim verifiable proof of completion stored directly on the blockchain.

![Arbitrum](https://img.shields.io/badge/Arbitrum-Sepolia-blue)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-purple)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Why Arbitrum?](#why-arbitrum)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Smart Contract](#smart-contract)
- [Getting Started](#getting-started)
- [Demo Instructions](#demo-instructions)
- [Future Roadmap](#future-roadmap)

---

## Problem Statement

**Traditional learning platforms have a verification problem:**

1. **Certificates are easily faked** - PDFs and images can be forged
2. **No universal standard** - Each platform has its own verification system
3. **Centralized storage** - If the platform shuts down, your credentials disappear
4. **No interoperability** - Credentials can't be easily shared or verified across platforms

---

## Solution

**ArbiLearn Proofs** solves this by:

1. **On-chain verification** - Proofs stored on Arbitrum blockchain, verifiable by anyone
2. **Immutable records** - Once claimed, proofs exist forever on-chain
3. **Universal standard** - Anyone can verify completion via smart contract
4. **Decentralized** - No single point of failure

---

## Why Arbitrum?

| Feature               | Benefit                                                 |
| --------------------- | ------------------------------------------------------- |
| **Low Gas Costs**     | Claiming proofs costs < 1¢ vs $5-50 on Ethereum mainnet |
| **Fast Transactions** | ~1 second finality for smooth UX                        |
| **Ethereum Security** | Inherits Ethereum's security via optimistic rollups     |
| **EVM Compatible**    | Standard Solidity development, easy to build            |
| **Growing Ecosystem** | Large developer community and tooling support           |

---

## Features

### Core Features

- **Wallet Connection** - RainbowKit integration for seamless wallet connection
- **5 Learning Challenges** - Interactive content about Arbitrum
- **Quiz Validation** - Pass the quiz to unlock proof claiming
- **On-Chain Proofs** - Permanent blockchain record of completion
- **Profile Dashboard** - View all your claimed proofs

### Polish Features

- **Confetti Animation** - Celebration on successful proof claim
- **Arbiscan Links** - Direct links to view transactions
- **Progress Tracking** - Visual progress bar
- **Mobile Responsive** - Works on all devices
- **Dark Mode** - Easy on the eyes

---

## Tech Stack

### Smart Contract

- **Solidity 0.8.19** - Smart contract language
- **Hardhat** - Development framework
- **Arbitrum Sepolia** - Testnet deployment

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **wagmi v2** - React hooks for Ethereum
- **RainbowKit** - Wallet connection UI
- **viem** - Ethereum library

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Landing   │  │  Challenges │  │   Challenge Page    │  │
│  │    Page     │  │    Page     │  │   (Quiz + Claim)    │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│                              │                               │
│                    ┌─────────┴─────────┐                    │
│                    │   wagmi + viem    │                    │
│                    └─────────┬─────────┘                    │
└──────────────────────────────┼──────────────────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │   RainbowKit Wallet  │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │           Arbitrum Sepolia Network           │
        │  ┌────────────────────────────────────────┐  │
        │  │        ProofOfLearning Contract        │  │
        │  │  ┌──────────────────────────────────┐  │  │
        │  │  │ mapping(user => challengeId =>   │  │  │
        │  │  │         completed)               │  │  │
        │  │  └──────────────────────────────────┘  │  │
        │  │  • claimProof(challengeId)            │  │
        │  │  • hasCompleted(user, challengeId)    │  │
        │  └────────────────────────────────────────┘  │
        └──────────────────────────────────────────────┘
```

### What's Stored On-Chain vs Off-Chain

| On-Chain          | Off-Chain          |
| ----------------- | ------------------ |
| User address      | Challenge content  |
| Challenge ID      | Quiz questions     |
| Completion status | Learning materials |
| Timestamp         | UI/UX              |

---

## Smart Contract



### Key Functions

```solidity
// Claim proof for a completed challenge
function claimProof(uint256 challengeId) external

// Check if user completed a challenge
function hasCompleted(address user, uint256 challengeId) view returns (bool)

// Get completion status for multiple challenges
function getCompletionStatus(address user, uint256[] challengeIds) view returns (bool[])
```

### Events

```solidity
event ProofClaimed(address indexed user, uint256 indexed challengeId, uint256 timestamp)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible wallet
- Arbitrum Sepolia testnet ETH ([Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia))

### 1. Clone the Repository

```bash
git clone https://github.com/om151/HackQuest_Arbitrum.git
```

### 2. Install Dependencies

**Smart Contract:**

```bash
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 3. Set Up Environment Variables

**Root directory (.env):**

```bash
cp .env.example .env
# Add your private key and Arbiscan API key
```

**Frontend (frontend/.env):**

```bash
cp .env.example .env
# Add contract address after deployment
# Add WalletConnect project ID
```

### 4. Compile & Test Smart Contract

```bash
npm run compile
npm run test
```

### 5. Deploy to Arbitrum Sepolia

```bash
npm run deploy:arbitrum
```

Copy the deployed contract address and add it to `frontend/.env`.

### 6. Run Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Demo Instructions

### For Hackathon Judges (2-minute test)

1. **Open the app** - Visit the deployed URL or run locally
2. **Connect wallet** - Click "Connect Wallet" and select Arbitrum Sepolia
3. **Get testnet ETH** - If needed, use the [Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
4. **Choose a challenge** - Click on any challenge card
5. **Read & take quiz** - Scroll through content, click "Take the Quiz"
6. **Answer questions** - Select answers and submit
7. **Claim proof** - If passed, click "Claim On-Chain Proof"
8. **View transaction** - Click the Arbiscan link to verify on-chain
9. **Check profile** - Navigate to "My Proofs" to see your claimed proofs

---

## Future Roadmap

### Phase 1 - MVP (Complete)

- [x] Smart contract for proof storage
- [x] 5 learning challenges
- [x] Quiz-based validation
- [x] On-chain proof claiming
- [x] Profile page

### Phase 2 - Enhancements

- [ ] NFT badges for completion
- [ ] Leaderboard system
- [ ] More challenges (10+)
- [ ] Challenge categories

### Phase 3 - Expansion

- [ ] User-generated challenges
- [ ] Organization accounts
- [ ] API for third-party verification
- [ ] Multi-chain support

### Phase 4 - Ecosystem

- [ ] Token incentives
- [ ] DAO governance
- [ ] Partner integrations
- [ ] Mobile app

---

## Project Structure

```
arbilearn-proofs/
├── contracts/
│   └── ProofOfLearning.sol      # Main smart contract
├── scripts/
│   └── deploy.js                 # Deployment script
├── test/
│   └── ProofOfLearning.test.js  # Contract tests
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── pages/               # Page components
│   │   ├── providers/           # Web3 providers
│   │   ├── config/              # Contract config
│   │   └── data/                # Challenge data
│   └── public/                  # Static assets
├── hardhat.config.js            # Hardhat config
└── README.md                    # This file
```

---

## Running Tests

```bash
# Run all tests
npm run test

# Run with coverage
npx hardhat coverage
```

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Contributing

Contributions are welcome! Please open an issue or PR.

---

## Contact

Built for the Arbitrum Hackathon

---

**ArbiLearn Proofs - Learn. Prove. Own.**
