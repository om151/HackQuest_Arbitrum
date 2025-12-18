// Contract ABI for ProofOfLearning
export const PROOF_OF_LEARNING_ABI = [
  {
    inputs: [],
    name: "AlreadyClaimed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ProofClaimed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "claimProof",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "challengeIds",
        type: "uint256[]",
      },
    ],
    name: "getCompletionStatus",
    outputs: [
      {
        internalType: "bool[]",
        name: "completedStatus",
        type: "bool[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "challengeId",
        type: "uint256",
      },
    ],
    name: "hasCompleted",
    outputs: [
      {
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalProofsClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Contract address on Arbitrum Sepolia
export const CONTRACT_ADDRESS =
  import.meta.env.VITE_CONTRACT_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

// Arbitrum Sepolia chain ID (used to force correct network)
export const ARBITRUM_SEPOLIA_CHAIN_ID = 421614;

// Chain config for wagmi
export const CHAIN_ID = 421614;

// Arbiscan URL for transaction links
export const ARBISCAN_URL = "https://sepolia.arbiscan.io";
