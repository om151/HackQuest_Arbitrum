import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { useAccount, useReadContract } from "wagmi";
import {
  ARBISCAN_URL,
  CONTRACT_ADDRESS,
  PROOF_OF_LEARNING_ABI,
} from "../config/contract";
import { challenges } from "../data/challenges";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();

  // Get completion status for all challenges
  const challengeIds = challenges.map((c) => BigInt(c.id));

  const { data: completionStatus, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PROOF_OF_LEARNING_ABI,
    functionName: "getCompletionStatus",
    args: [address, challengeIds],
    enabled: isConnected && address,
  });

  const completedChallenges = challenges.filter(
    (_, index) => completionStatus?.[index]
  );
  const completedCount = completedChallenges.length;
  const totalCount = challenges.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Not connected state
  if (!isConnected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Connect your wallet to view your learning proofs and track your
          progress.
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="bg-slate-800/50 rounded-xl p-8 mb-8 border border-slate-700">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-gradient-to-br from-arbitrum-blue to-arbitrum-dark rounded-full flex items-center justify-center text-3xl">
            🎓
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">Your Learning Profile</h1>
            <p className="text-slate-400 text-sm font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <a
              href={`${ARBISCAN_URL}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-arbitrum-blue text-sm hover:underline"
            >
              View on Arbiscan ↗
            </a>
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="text-4xl font-bold gradient-text">
              {completedCount}
            </div>
            <div className="text-slate-400 text-sm">Proofs Claimed</div>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-r from-arbitrum-blue/20 to-slate-800/50 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Overall Progress</h2>
          <span className="text-2xl font-bold gradient-text">
            {progressPercent}%
          </span>
        </div>
        <div className="h-4 bg-slate-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-arbitrum-blue to-arbitrum-light rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-slate-400 text-sm">
          {completedCount} of {totalCount} challenges completed
        </p>

        {completedCount === totalCount && (
          <div className="mt-4 p-4 bg-green-500/20 rounded-lg text-center">
            <span className="text-green-400 font-bold">
              🏆 Congratulations! You've completed all challenges!
            </span>
          </div>
        )}
      </div>

      {/* Section Header */}
      <h2 className="text-2xl font-bold mb-6">
        Your <span className="gradient-text">Proofs</span>
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-slate-400">Loading your proofs...</p>
        </div>
      )}

      {/* Completed Challenges */}
      {!isLoading && completedCount > 0 && (
        <div className="grid gap-4">
          {completedChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-slate-800/50 rounded-xl p-6 border-2 border-green-500/30 flex items-center gap-4"
            >
              <span className="text-4xl">{challenge.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{challenge.title}</h3>
                <p className="text-slate-400 text-sm">
                  {challenge.description}
                </p>
              </div>
              <div className="text-right">
                <span className="bg-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full inline-flex items-center gap-2">
                  ✓ Verified On-Chain
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && completedCount === 0 && (
        <div className="text-center py-12 bg-slate-800/30 rounded-xl">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold mb-2">No Proofs Yet</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Complete learning challenges to earn verifiable on-chain proofs of
            your knowledge.
          </p>
          <Link to="/challenges" className="btn-primary inline-block">
            Start Your First Challenge →
          </Link>
        </div>
      )}

      {/* Remaining Challenges */}
      {!isLoading && completedCount < totalCount && completedCount > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Remaining Challenges</h2>
          <div className="grid gap-4">
            {challenges
              .filter((_, index) => !completionStatus?.[index])
              .map((challenge) => (
                <Link
                  key={challenge.id}
                  to={`/challenge/${challenge.id}`}
                  className="bg-slate-800/30 rounded-xl p-4 border border-slate-700 flex items-center gap-4 hover:border-arbitrum-blue transition-colors"
                >
                  <span className="text-3xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <p className="text-slate-400 text-sm">
                      {challenge.estimatedTime}
                    </p>
                  </div>
                  <span className="text-arbitrum-blue">Start →</span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
