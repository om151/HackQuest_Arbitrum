import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

// RainbowKit config - ONLY Arbitrum Sepolia
const config = getDefaultConfig({
  appName: "ArbiLearn Proofs",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "demo",
  chains: [arbitrumSepolia],
  ssr: false,
});

// React Query client
const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={arbitrumSepolia}
          theme={darkTheme({
            accentColor: "#28A0F0",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
