const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying ProofOfLearning to", hre.network.name, "...\n");

  // Get deployer account
  const signers = await hre.ethers.getSigners();

  if (!signers || signers.length === 0) {
    console.error("\n❌ ERROR: No wallet found!");
    console.error(
      "\n📋 To fix this, create a .env file in the project root with:"
    );
    console.error("   PRIVATE_KEY=your_private_key_without_0x_prefix\n");
    console.error("   Get your private key from MetaMask:");
    console.error("   1. Open MetaMask → Click account icon → Account Details");
    console.error("   2. Click 'Show Private Key' → Enter password");
    console.error("   3. Copy the key (remove 0x if present)\n");
    process.exit(1);
  }

  const deployer = signers[0];
  console.log("📍 Deployer address:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Deployer balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Deploy contract
  const ProofOfLearning = await hre.ethers.getContractFactory(
    "ProofOfLearning"
  );
  const proofOfLearning = await ProofOfLearning.deploy();
  await proofOfLearning.waitForDeployment();

  const contractAddress = await proofOfLearning.getAddress();

  console.log("✅ ProofOfLearning deployed to:", contractAddress);
  console.log("\n📋 Next steps:");
  console.log(
    "1. Update frontend/.env with CONTRACT_ADDRESS=" + contractAddress
  );
  console.log("2. Verify on Arbiscan (optional):");
  console.log(
    `   npx hardhat verify --network arbitrumSepolia ${contractAddress}`
  );

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    chainId: hre.network.config.chainId,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\n📄 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  return contractAddress;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
