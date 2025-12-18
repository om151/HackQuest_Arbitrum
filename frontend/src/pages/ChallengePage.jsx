import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  ARBISCAN_URL,
  CHAIN_ID,
  CONTRACT_ADDRESS,
  PROOF_OF_LEARNING_ABI,
} from "../config/contract";
import { getChallengeById, validateQuiz } from "../data/challenges";

export default function ChallengePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();

  const challenge = getChallengeById(id);

  // Quiz state
  const [answers, setAnswers] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // Check if already completed
  const { data: isCompleted, refetch: refetchCompleted } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: PROOF_OF_LEARNING_ABI,
    functionName: "hasCompleted",
    args: [address, BigInt(id)],
    enabled: isConnected && address,
  });

  // Contract write for claiming proof
  const {
    data: hash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  // Wait for transaction
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    error: confirmError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Fire confetti on success
  useEffect(() => {
    if (isConfirmed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#28A0F0", "#96D9FF", "#ffffff"],
      });
      refetchCompleted();
    }
  }, [isConfirmed]);

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Challenge not found</h1>
        <Link to="/challenges" className="text-arbitrum-blue hover:underline">
          ← Back to Challenges
        </Link>
      </div>
    );
  }

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (quizSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleQuizSubmit = () => {
    const result = validateQuiz(challenge.id, answers);
    setQuizResult(result);
    setQuizSubmitted(true);
  };

  const handleClaimProof = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: PROOF_OF_LEARNING_ABI,
      functionName: "claimProof",
      args: [BigInt(challenge.id)],
      chainId: CHAIN_ID,
    });
  };

  const handleRetryQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
    resetWrite();
  };

  const allQuestionsAnswered =
    Object.keys(answers).length === challenge.questions.length;
  const error = writeError || confirmError;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <Link
        to="/challenges"
        className="text-slate-400 hover:text-white text-sm mb-6 inline-flex items-center gap-2"
      >
        ← Back to Challenges
      </Link>

      {/* Challenge Header */}
      <div className="bg-slate-800/50 rounded-xl p-8 mb-8 border border-slate-700">
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl">{challenge.icon}</span>
          {isCompleted ? (
            <span className="bg-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2">
              ✓ Proof Claimed
            </span>
          ) : (
            <span
              className={`text-sm font-medium px-4 py-2 rounded-full ${
                challenge.difficulty === "Beginner"
                  ? "bg-green-500/20 text-green-400"
                  : challenge.difficulty === "Intermediate"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {challenge.difficulty}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-2">{challenge.title}</h1>
        <p className="text-slate-400">{challenge.description}</p>

        <div className="flex gap-4 mt-4 text-sm text-slate-500">
          <span>⏱️ {challenge.estimatedTime}</span>
          <span>📝 {challenge.questions.length} questions</span>
        </div>
      </div>

      {/* Already Completed State */}
      {isCompleted && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8 text-center">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-xl font-bold text-green-400 mb-2">
            Challenge Completed!
          </h2>
          <p className="text-slate-400 mb-4">
            You've already claimed proof for this challenge.
          </p>
          <Link to="/profile" className="text-arbitrum-blue hover:underline">
            View your proofs →
          </Link>
        </div>
      )}

      {/* Transaction Success State */}
      {isConfirmed && hash && !isCompleted && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-green-400 mb-2">
            Proof Claimed Successfully!
          </h2>
          <p className="text-slate-400 mb-4">
            Your proof of completion is now stored on the Arbitrum blockchain.
          </p>
          <a
            href={`${ARBISCAN_URL}/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-arbitrum-blue hover:underline inline-flex items-center gap-2"
          >
            View on Arbiscan ↗
          </a>
        </div>
      )}

      {/* Learning Content */}
      {!showQuiz && !isCompleted && (
        <div className="mb-8">
          <div
            className="bg-slate-800/30 rounded-xl p-8 prose prose-invert max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: challenge.content }}
          />

          <button
            onClick={() => setShowQuiz(true)}
            className="btn-primary w-full text-lg"
          >
            📝 Take the Quiz
          </button>
        </div>
      )}

      {/* Quiz Section */}
      {showQuiz && !isCompleted && !isConfirmed && (
        <div className="bg-slate-800/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Quiz: {challenge.title}</h2>

          {/* Questions */}
          <div className="space-y-8">
            {challenge.questions.map((q, qIndex) => (
              <div key={q.id}>
                <h3 className="text-lg font-medium mb-4">
                  {qIndex + 1}. {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((option, oIndex) => {
                    const isSelected = answers[qIndex] === oIndex;
                    const isCorrect = q.correctAnswer === oIndex;

                    let optionClass = "quiz-option";
                    if (quizSubmitted) {
                      if (isCorrect) {
                        optionClass += " correct";
                      } else if (isSelected && !isCorrect) {
                        optionClass += " incorrect";
                      }
                    } else if (isSelected) {
                      optionClass += " selected";
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswerSelect(qIndex, oIndex)}
                        className={optionClass}
                        disabled={quizSubmitted}
                      >
                        <span className="font-medium mr-3">
                          {String.fromCharCode(65 + oIndex)}.
                        </span>
                        {option}
                        {quizSubmitted && isCorrect && (
                          <span className="float-right text-green-400">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Quiz Actions */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={!allQuestionsAnswered}
                className="btn-primary w-full"
              >
                Submit Answers
              </button>
            ) : (
              <div className="space-y-4">
                {/* Result */}
                <div
                  className={`text-center p-4 rounded-lg ${
                    quizResult.passed
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  <div className="text-2xl mb-2">
                    {quizResult.passed ? "🎉" : "😔"}
                  </div>
                  <p className="font-bold">
                    {quizResult.passed
                      ? "Congratulations! You passed!"
                      : "Not quite. Try again!"}
                  </p>
                  <p className="text-sm mt-1">
                    Score: {quizResult.score}/{quizResult.total} (
                    {quizResult.percentage}%)
                  </p>
                </div>

                {/* Actions based on result */}
                {quizResult.passed ? (
                  <div className="space-y-4">
                    {!isConnected ? (
                      <div className="text-center text-slate-400">
                        Connect your wallet to claim proof
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={handleClaimProof}
                          disabled={isWritePending || isConfirming}
                          className="btn-primary w-full flex items-center justify-center gap-2"
                        >
                          {isWritePending ? (
                            <>
                              <span className="animate-spin">⏳</span>
                              Confirm in Wallet...
                            </>
                          ) : isConfirming ? (
                            <>
                              <span className="animate-spin">⏳</span>
                              Confirming Transaction...
                            </>
                          ) : (
                            <>🏆 Claim On-Chain Proof</>
                          )}
                        </button>

                        {/* Error display */}
                        {error && (
                          <div className="bg-red-500/20 text-red-400 p-4 rounded-lg text-sm">
                            <p className="font-bold mb-1">Error:</p>
                            <p>{error.shortMessage || error.message}</p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleRetryQuiz}
                    className="btn-secondary w-full"
                  >
                    🔄 Try Again
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Content Again (for completed) */}
      {isCompleted && !showQuiz && (
        <div className="bg-slate-800/30 rounded-xl p-8">
          <h2 className="text-xl font-bold mb-4">Review Material</h2>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: challenge.content }}
          />
        </div>
      )}
    </div>
  );
}
