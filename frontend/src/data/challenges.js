// Learning challenges data for ArbiLearn Proofs
// Each challenge has a unique ID, title, description, and quiz questions

export const challenges = [
  {
    id: 1,
    title: "Introduction to Arbitrum",
    description:
      "Learn the basics of Arbitrum - what it is and why it matters for Ethereum scaling.",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    icon: "🚀",
    content: `
      <h2>What is Arbitrum?</h2>
      <p>Arbitrum is a Layer 2 (L2) scaling solution for Ethereum that uses optimistic rollup technology to process transactions faster and cheaper than the Ethereum mainnet.</p>
      
      <h3>Key Points:</h3>
      <ul>
        <li><strong>Layer 2 Solution:</strong> Arbitrum sits on top of Ethereum, inheriting its security while providing scalability.</li>
        <li><strong>Optimistic Rollups:</strong> Transactions are assumed valid by default, only checked if disputed.</li>
        <li><strong>EVM Compatible:</strong> Developers can deploy existing Ethereum smart contracts with minimal changes.</li>
        <li><strong>Lower Fees:</strong> Transaction costs are significantly reduced compared to Ethereum L1.</li>
      </ul>
      
      <h3>Why Arbitrum?</h3>
      <p>Ethereum can only process about 15-30 transactions per second. Arbitrum can handle thousands of transactions per second while maintaining Ethereum's security guarantees.</p>
    `,
    questions: [
      {
        id: 1,
        question: "What type of scaling solution is Arbitrum?",
        options: [
          "Layer 1 blockchain",
          "Layer 2 rollup",
          "Sidechain",
          "Payment channel",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question:
          "What technology does Arbitrum use for transaction validation?",
        options: [
          "Zero-knowledge proofs",
          "Proof of Work",
          "Optimistic rollups",
          "Proof of Stake",
        ],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: "Is Arbitrum compatible with Ethereum smart contracts?",
        options: [
          "No, completely different architecture",
          "Yes, it's EVM compatible",
          "Only for simple contracts",
          "Requires complete rewrite",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "L1 vs L2: Understanding the Difference",
    description:
      "Understand the fundamental differences between Layer 1 and Layer 2 solutions.",
    difficulty: "Beginner",
    estimatedTime: "5 min",
    icon: "⚡",
    content: `
      <h2>Layer 1 vs Layer 2</h2>
      
      <h3>Layer 1 (L1) - The Base Layer</h3>
      <p>Layer 1 refers to the base blockchain network, like Ethereum mainnet. It's where:</p>
      <ul>
        <li>Final settlement occurs</li>
        <li>Maximum security is provided</li>
        <li>Consensus is reached by all validators</li>
        <li>Transaction costs can be high during congestion</li>
      </ul>
      
      <h3>Layer 2 (L2) - The Scaling Layer</h3>
      <p>Layer 2 solutions like Arbitrum build on top of L1 to:</p>
      <ul>
        <li>Process transactions off the main chain</li>
        <li>Bundle many transactions together</li>
        <li>Reduce costs significantly (often 10-100x cheaper)</li>
        <li>Increase throughput dramatically</li>
        <li>Post proofs back to L1 for security</li>
      </ul>
      
      <h3>The Security Model</h3>
      <p>Arbitrum inherits Ethereum's security because all L2 transactions can be verified and disputed on L1 if needed.</p>
    `,
    questions: [
      {
        id: 1,
        question:
          "Where does final settlement occur in the Ethereum ecosystem?",
        options: [
          "Layer 2",
          "Layer 1 (Ethereum mainnet)",
          "Both equally",
          "Neither",
        ],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: "What is a main benefit of Layer 2 solutions?",
        options: [
          "They replace Ethereum completely",
          "They reduce transaction costs significantly",
          "They have their own consensus mechanism unrelated to Ethereum",
          "They only work for NFTs",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "How does Arbitrum maintain security?",
        options: [
          "It has its own validators completely separate from Ethereum",
          "It posts proofs to Ethereum L1",
          "It uses a centralized server",
          "It doesn't maintain security",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Arbitrum Gas Advantages",
    description:
      "Learn how Arbitrum reduces transaction costs compared to Ethereum mainnet.",
    difficulty: "Intermediate",
    estimatedTime: "7 min",
    icon: "⛽",
    content: `
      <h2>Understanding Gas on Arbitrum</h2>
      
      <h3>Why is Arbitrum Cheaper?</h3>
      <p>Arbitrum achieves lower gas costs through several mechanisms:</p>
      
      <h4>1. Data Compression</h4>
      <p>Transaction data is compressed before being posted to L1, reducing the amount of expensive L1 calldata needed.</p>
      
      <h4>2. Batching</h4>
      <p>Many L2 transactions are batched together into a single L1 transaction, spreading the L1 cost across many users.</p>
      
      <h4>3. Off-chain Execution</h4>
      <p>The actual computation happens off-chain on Arbitrum's nodes, not on Ethereum's expensive mainnet.</p>
      
      <h3>Typical Savings</h3>
      <ul>
        <li><strong>Simple transfers:</strong> ~10-50x cheaper</li>
        <li><strong>DEX swaps:</strong> ~10-20x cheaper</li>
        <li><strong>NFT mints:</strong> ~20-50x cheaper</li>
        <li><strong>Complex DeFi:</strong> ~5-20x cheaper</li>
      </ul>
      
      <h3>Gas Token</h3>
      <p>Arbitrum uses ETH for gas, just like Ethereum. You don't need a special token!</p>
    `,
    questions: [
      {
        id: 1,
        question: "What token does Arbitrum use for gas fees?",
        options: ["ARB token", "ARBI token", "ETH", "MATIC"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "How does batching help reduce costs?",
        options: [
          "It doesn't affect costs",
          "It spreads L1 costs across many L2 transactions",
          "It eliminates all fees",
          "It increases security only",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question:
          "Approximately how much cheaper can a simple transfer be on Arbitrum?",
        options: [
          "Same cost as L1",
          "2x cheaper",
          "10-50x cheaper",
          "1000x cheaper",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 4,
    title: "Introduction to Stylus",
    description:
      "Discover Stylus - Arbitrum's innovation for writing smart contracts in Rust, C, and more.",
    difficulty: "Intermediate",
    estimatedTime: "8 min",
    icon: "🎨",
    content: `
      <h2>What is Stylus?</h2>
      
      <p>Stylus is a revolutionary upgrade to Arbitrum that allows developers to write smart contracts in languages like Rust, C, and C++ - not just Solidity!</p>
      
      <h3>How Does It Work?</h3>
      <p>Stylus compiles code to WebAssembly (WASM), which runs alongside the EVM on Arbitrum:</p>
      <ul>
        <li><strong>WASM Execution:</strong> Fast, efficient execution of compiled code</li>
        <li><strong>EVM Compatibility:</strong> Stylus contracts can call Solidity contracts and vice versa</li>
        <li><strong>Same Security:</strong> Inherits all of Arbitrum's security guarantees</li>
      </ul>
      
      <h3>Benefits of Stylus</h3>
      <ul>
        <li><strong>Performance:</strong> Up to 10-100x faster execution for compute-heavy operations</li>
        <li><strong>Lower Costs:</strong> More efficient execution means lower gas costs</li>
        <li><strong>Developer Choice:</strong> Use familiar languages like Rust</li>
        <li><strong>Memory Safety:</strong> Rust's safety features help prevent bugs</li>
      </ul>
      
      <h3>Use Cases</h3>
      <p>Stylus is especially powerful for:</p>
      <ul>
        <li>Cryptographic operations</li>
        <li>On-chain gaming</li>
        <li>Complex mathematical computations</li>
        <li>AI/ML inference</li>
      </ul>
    `,
    questions: [
      {
        id: 1,
        question: "What languages can you use to write Stylus smart contracts?",
        options: [
          "Only Solidity",
          "Only JavaScript",
          "Rust, C, C++ and more",
          "Only Python",
        ],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: "What does Stylus compile code to?",
        options: [
          "EVM bytecode only",
          "WebAssembly (WASM)",
          "JavaScript",
          "Native machine code",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "Can Stylus contracts interact with Solidity contracts?",
        options: [
          "No, they are completely separate",
          "Yes, they can call each other",
          "Only in one direction",
          "Only through bridges",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    title: "Building on Arbitrum",
    description:
      "Learn the basics of deploying and interacting with smart contracts on Arbitrum.",
    difficulty: "Advanced",
    estimatedTime: "10 min",
    icon: "🛠️",
    content: `
      <h2>Deploying to Arbitrum</h2>
      
      <h3>Getting Started</h3>
      <p>Building on Arbitrum is almost identical to building on Ethereum:</p>
      <ol>
        <li>Write your Solidity contracts as usual</li>
        <li>Configure your deployment tool (Hardhat, Foundry) for Arbitrum</li>
        <li>Get testnet ETH from the Arbitrum Sepolia faucet</li>
        <li>Deploy using the Arbitrum RPC endpoint</li>
      </ol>
      
      <h3>Network Configuration</h3>
      <ul>
        <li><strong>Arbitrum One (Mainnet):</strong> Chain ID 42161</li>
        <li><strong>Arbitrum Sepolia (Testnet):</strong> Chain ID 421614</li>
        <li><strong>RPC URL:</strong> https://sepolia-rollup.arbitrum.io/rpc</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Test on Arbitrum Sepolia before mainnet</li>
        <li>Use the same security practices as Ethereum</li>
        <li>Consider L1-L2 messaging for cross-chain features</li>
        <li>Take advantage of lower gas costs for more complex logic</li>
      </ul>
      
      <h3>Tools & Resources</h3>
      <ul>
        <li>Arbiscan - Block explorer</li>
        <li>Arbitrum Bridge - Move assets between L1 and L2</li>
        <li>Arbitrum Portal - Developer documentation</li>
      </ul>
    `,
    questions: [
      {
        id: 1,
        question: "What is the Chain ID for Arbitrum Sepolia testnet?",
        options: ["1", "42161", "421614", "137"],
        correctAnswer: 2,
      },
      {
        id: 2,
        question:
          "What language do you use to write smart contracts on Arbitrum?",
        options: [
          "A completely new language",
          "Solidity (same as Ethereum)",
          "Only JavaScript",
          "Only Rust",
        ],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: "What should you do before deploying to Arbitrum mainnet?",
        options: [
          "Deploy directly to mainnet",
          "Test on Arbitrum Sepolia testnet first",
          "Skip all testing",
          "Only test on Ethereum mainnet",
        ],
        correctAnswer: 1,
      },
    ],
  },
];

// Helper function to get a challenge by ID
export function getChallengeById(id) {
  return challenges.find((c) => c.id === parseInt(id));
}

// Helper function to validate quiz answers
export function validateQuiz(challengeId, answers) {
  const challenge = getChallengeById(challengeId);
  if (!challenge) return { passed: false, score: 0, total: 0 };

  let correct = 0;
  const total = challenge.questions.length;

  challenge.questions.forEach((q, index) => {
    if (answers[index] === q.correctAnswer) {
      correct++;
    }
  });

  // Must get all questions correct to pass
  const passed = correct === total;

  return {
    passed,
    score: correct,
    total,
    percentage: Math.round((correct / total) * 100),
  };
}
