import { Link } from 'react-router-dom';
import { useAccount, useReadContract } from 'wagmi';
import { challenges } from '../data/challenges';
import { PROOF_OF_LEARNING_ABI, CONTRACT_ADDRESS } from '../config/contract';

export default function ChallengesPage() {
  const { address, isConnected } = useAccount();

  // Get completion status for all challenges
  const challengeIds = challenges.map(c => BigInt(c.id));
  
  const { data: completionStatus, isLoading } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PROOF_OF_LEARNING_ABI,
    functionName: 'getCompletionStatus',
    args: [address, challengeIds],
    enabled: isConnected && address,
  });

  const completedCount = completionStatus?.filter(Boolean).length || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Learning <span className="gradient-text">Challenges</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Complete these challenges to learn about Arbitrum and earn on-chain proofs of completion.
        </p>
        
        {/* Progress */}
        {isConnected && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Your Progress</span>
              <span>{completedCount} / {challenges.length} Completed</span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-arbitrum-blue to-arbitrum-light rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / challenges.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Challenges Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge, index) => {
          const isCompleted = completionStatus?.[index] || false;
          
          return (
            <Link
              key={challenge.id}
              to={`/challenge/${challenge.id}`}
              className={`bg-slate-800/50 rounded-xl p-6 card-glow hover:scale-[1.02] transition-all duration-200 ${
                isCompleted ? 'border-2 border-green-500/50' : 'border border-slate-700'
              }`}
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-4xl">{challenge.icon}</span>
                {isCompleted ? (
                  <span className="bg-green-500/20 text-green-400 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    ✓ Completed
                  </span>
                ) : (
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    challenge.difficulty === 'Beginner' 
                      ? 'bg-green-500/20 text-green-400'
                      : challenge.difficulty === 'Intermediate'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {challenge.description}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">
                  ⏱️ {challenge.estimatedTime}
                </span>
                <span className="text-slate-500">
                  📝 {challenge.questions.length} questions
                </span>
              </div>

              {/* CTA */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <span className={`font-medium ${isCompleted ? 'text-green-400' : 'text-arbitrum-blue'}`}>
                  {isCompleted ? 'View Again →' : 'Start Challenge →'}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty state for not connected */}
      {!isConnected && (
        <div className="text-center mt-12 p-8 bg-slate-800/30 rounded-xl">
          <p className="text-slate-400 mb-4">
            Connect your wallet to track your progress and claim proofs
          </p>
        </div>
      )}
    </div>
  );
}
