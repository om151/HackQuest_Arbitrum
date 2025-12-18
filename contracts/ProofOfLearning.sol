// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title ProofOfLearning
 * @author ArbiLearn Proofs Team
 * @notice A simple contract for storing verifiable proof of learning challenge completion
 * @dev Deployed on Arbitrum Sepolia for hackathon demonstration
 * 
 * Architecture:
 * - Users complete learning challenges on the frontend
 * - After passing a quiz, they call claimProof() to record completion on-chain
 * - Each user can only claim proof once per challenge (prevents duplicates)
 * - Anyone can verify completion status via hasCompleted()
 */
contract ProofOfLearning {
    
    // ============ State Variables ============
    
    /**
     * @notice Mapping to track which users have completed which challenges
     * @dev mapping(userAddress => mapping(challengeId => completed))
     */
    mapping(address => mapping(uint256 => bool)) private completions;
    
    /**
     * @notice Counter for total proofs claimed (for stats)
     */
    uint256 public totalProofsClaimed;
    
    // ============ Events ============
    
    /**
     * @notice Emitted when a user successfully claims proof for a challenge
     * @param user The address of the user who claimed the proof
     * @param challengeId The ID of the completed challenge
     * @param timestamp The block timestamp when proof was claimed
     */
    event ProofClaimed(
        address indexed user,
        uint256 indexed challengeId,
        uint256 timestamp
    );
    
    // ============ Errors ============
    
    /**
     * @notice Thrown when user tries to claim proof for an already completed challenge
     */
    error AlreadyClaimed();
    
    // ============ External Functions ============
    
    /**
     * @notice Claim proof of completion for a learning challenge
     * @dev Reverts if the user has already claimed proof for this challenge
     * @param challengeId The unique identifier of the challenge completed
     * 
     * Requirements:
     * - User must not have already claimed proof for this challengeId
     * 
     * Emits a {ProofClaimed} event
     */
    function claimProof(uint256 challengeId) external {
        // Check if user already claimed this challenge
        if (completions[msg.sender][challengeId]) {
            revert AlreadyClaimed();
        }
        
        // Record the completion
        completions[msg.sender][challengeId] = true;
        
        // Increment total proofs counter
        totalProofsClaimed++;
        
        // Emit event for off-chain indexing and verification
        emit ProofClaimed(msg.sender, challengeId, block.timestamp);
    }
    
    /**
     * @notice Check if a user has completed a specific challenge
     * @param user The address of the user to check
     * @param challengeId The ID of the challenge to check
     * @return completed True if the user has claimed proof for this challenge
     */
    function hasCompleted(address user, uint256 challengeId) external view returns (bool completed) {
        return completions[user][challengeId];
    }
    
    /**
     * @notice Get completion status for multiple challenges for a user
     * @param user The address of the user to check
     * @param challengeIds Array of challenge IDs to check
     * @return completedStatus Array of booleans indicating completion status
     */
    function getCompletionStatus(address user, uint256[] calldata challengeIds) 
        external 
        view 
        returns (bool[] memory completedStatus) 
    {
        completedStatus = new bool[](challengeIds.length);
        for (uint256 i = 0; i < challengeIds.length; i++) {
            completedStatus[i] = completions[user][challengeIds[i]];
        }
        return completedStatus;
    }
}
