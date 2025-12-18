const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProofOfLearning", function () {
  let proofOfLearning;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy contract
    const ProofOfLearning = await ethers.getContractFactory("ProofOfLearning");
    proofOfLearning = await ProofOfLearning.deploy();
    await proofOfLearning.waitForDeployment();
  });

  describe("claimProof", function () {
    it("should allow a user to claim proof for a challenge", async function () {
      const challengeId = 1;

      // Claim proof
      const tx = await proofOfLearning.connect(user1).claimProof(challengeId);
      await tx.wait();

      // Verify completion
      const completed = await proofOfLearning.hasCompleted(
        user1.address,
        challengeId
      );
      expect(completed).to.be.true;
    });

    it("should emit ProofClaimed event", async function () {
      const challengeId = 1;

      // Claim proof and check for event
      const tx = await proofOfLearning.connect(user1).claimProof(challengeId);
      const receipt = await tx.wait();

      // Check that event was emitted
      const event = receipt.logs.find((log) => {
        try {
          const parsed = proofOfLearning.interface.parseLog(log);
          return parsed.name === "ProofClaimed";
        } catch {
          return false;
        }
      });

      expect(event).to.not.be.undefined;

      const parsedEvent = proofOfLearning.interface.parseLog(event);
      expect(parsedEvent.args.user).to.equal(user1.address);
      expect(parsedEvent.args.challengeId).to.equal(BigInt(challengeId));
    });

    it("should fail when claiming duplicate proof", async function () {
      const challengeId = 1;

      // First claim succeeds
      await proofOfLearning.connect(user1).claimProof(challengeId);

      // Second claim should fail
      try {
        await proofOfLearning.connect(user1).claimProof(challengeId);
        expect.fail("Should have reverted");
      } catch (error) {
        expect(error.message).to.include("AlreadyClaimed");
      }
    });

    it("should allow different users to claim same challenge", async function () {
      const challengeId = 1;

      // User1 claims
      await proofOfLearning.connect(user1).claimProof(challengeId);

      // User2 claims same challenge - should succeed
      await proofOfLearning.connect(user2).claimProof(challengeId);

      // Both should be marked as completed
      expect(await proofOfLearning.hasCompleted(user1.address, challengeId)).to
        .be.true;
      expect(await proofOfLearning.hasCompleted(user2.address, challengeId)).to
        .be.true;
    });

    it("should allow same user to claim different challenges", async function () {
      // User1 claims multiple challenges
      await proofOfLearning.connect(user1).claimProof(1);
      await proofOfLearning.connect(user1).claimProof(2);
      await proofOfLearning.connect(user1).claimProof(3);

      // All should be marked as completed
      expect(await proofOfLearning.hasCompleted(user1.address, 1)).to.be.true;
      expect(await proofOfLearning.hasCompleted(user1.address, 2)).to.be.true;
      expect(await proofOfLearning.hasCompleted(user1.address, 3)).to.be.true;
    });

    it("should increment totalProofsClaimed counter", async function () {
      expect(await proofOfLearning.totalProofsClaimed()).to.equal(BigInt(0));

      await proofOfLearning.connect(user1).claimProof(1);
      expect(await proofOfLearning.totalProofsClaimed()).to.equal(BigInt(1));

      await proofOfLearning.connect(user2).claimProof(1);
      expect(await proofOfLearning.totalProofsClaimed()).to.equal(BigInt(2));
    });
  });

  describe("hasCompleted", function () {
    it("should return false for unclaimed challenge", async function () {
      const completed = await proofOfLearning.hasCompleted(user1.address, 999);
      expect(completed).to.be.false;
    });

    it("should return true for claimed challenge", async function () {
      await proofOfLearning.connect(user1).claimProof(1);

      const completed = await proofOfLearning.hasCompleted(user1.address, 1);
      expect(completed).to.be.true;
    });
  });

  describe("getCompletionStatus", function () {
    it("should return correct status for multiple challenges", async function () {
      // User1 completes challenges 1 and 3
      await proofOfLearning.connect(user1).claimProof(1);
      await proofOfLearning.connect(user1).claimProof(3);

      const status = await proofOfLearning.getCompletionStatus(
        user1.address,
        [1, 2, 3, 4]
      );

      expect(status[0]).to.be.true; // Challenge 1 - completed
      expect(status[1]).to.be.false; // Challenge 2 - not completed
      expect(status[2]).to.be.true; // Challenge 3 - completed
      expect(status[3]).to.be.false; // Challenge 4 - not completed
    });

    it("should return empty array for empty input", async function () {
      const status = await proofOfLearning.getCompletionStatus(
        user1.address,
        []
      );
      expect(status.length).to.equal(0);
    });
  });
});
