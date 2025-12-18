import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";

export default function Layout({ children }) {
  const location = useLocation();
  const { isConnected } = useAccount();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/challenges", label: "Challenges" },
    { path: "/profile", label: "My Proofs" },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/arbitrum-logo.svg"
                alt="ArbiLearn"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold gradient-text">
                ArbiLearn Proofs
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-arbitrum-blue"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Wallet Connect */}
            <div className="flex items-center gap-4">
              <ConnectButton
                showBalance={false}
                chainStatus="icon"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "full",
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50">
        <div className="flex justify-around py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center text-xs ${
                location.pathname === link.path
                  ? "text-arbitrum-blue"
                  : "text-slate-400"
              }`}
            >
              <span className="text-lg mb-1">
                {link.path === "/"
                  ? "🏠"
                  : link.path === "/challenges"
                  ? "📚"
                  : "🏆"}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-0">{children}</main>

      {/* Footer */}
      <footer className="hidden md:block bg-slate-800/30 border-t border-slate-700 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>Built with ❤️ on Arbitrum Sepolia for the Hackathon</p>
          <p className="mt-2">
            <a
              href="https://sepolia.arbiscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-arbitrum-blue hover:underline"
            >
              View on Arbiscan
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
