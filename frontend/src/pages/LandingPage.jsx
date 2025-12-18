import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export default function LandingPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-arbitrum-blue/20 via-slate-900 to-slate-900" />
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-arbitrum-blue/10 border border-arbitrum-blue/30 rounded-full px-4 py-2 mb-8">
              <span className="text-arbitrum-blue text-sm font-medium">
                🎓 Built on Arbitrum Sepolia
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Learn About{' '}
              <span className="gradient-text">Arbitrum</span>
              <br />
              Earn{' '}
              <span className="gradient-text">On-Chain Proofs</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Complete interactive learning challenges about Arbitrum and claim 
              verifiable proof of completion stored directly on the blockchain.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {isConnected ? (
                <Link to="/challenges" className="btn-primary text-lg px-8 py-4">
                  🚀 Start Learning
                </Link>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <ConnectButton label="Connect Wallet to Start" />
                  <p className="text-slate-500 text-sm">Connect your wallet to begin</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It <span className="gradient-text">Works</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                icon: '🔗',
                title: 'Connect Wallet',
                description: 'Connect your wallet to Arbitrum Sepolia testnet'
              },
              {
                step: '2',
                icon: '📚',
                title: 'Choose Challenge',
                description: 'Pick a learning challenge about Arbitrum'
              },
              {
                step: '3',
                icon: '✍️',
                title: 'Complete Quiz',
                description: 'Read the material and pass the quiz'
              },
              {
                step: '4',
                icon: '🏆',
                title: 'Claim Proof',
                description: 'Mint your on-chain proof of completion'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-arbitrum-blue/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-arbitrum-blue font-bold text-sm mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why <span className="gradient-text">ArbiLearn Proofs</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '⛓️',
                title: 'Fully On-Chain',
                description: 'Your proof of completion is stored on Arbitrum blockchain forever. Verifiable by anyone.'
              },
              {
                icon: '💸',
                title: 'Low Cost',
                description: 'Thanks to Arbitrum\'s L2 scaling, claiming proofs costs only a fraction of a cent.'
              },
              {
                icon: '🔒',
                title: 'No Duplication',
                description: 'Smart contract prevents duplicate claims. Each proof is unique to your address.'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-slate-800/50 rounded-xl p-6 card-glow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-arbitrum-blue/20 to-slate-800/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '5', label: 'Challenges' },
              { value: '100%', label: 'On-Chain' },
              { value: '<1¢', label: 'Per Proof' }
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start <span className="gradient-text">Learning</span>?
          </h2>
          <p className="text-slate-400 mb-8">
            Connect your wallet and complete your first challenge in under 5 minutes.
          </p>
          {isConnected ? (
            <Link to="/challenges" className="btn-primary text-lg px-8 py-4 inline-block">
              View All Challenges →
            </Link>
          ) : (
            <ConnectButton />
          )}
        </div>
      </section>
    </div>
  );
}
