import { useAccount, useConnect, useDisconnect, WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

function ConnectWallet() {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  if (address) {
    return (
      <div>
        You are connected {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }
  return (
    <div>
      {connectors.map((a) => (
        <button onClick={() => connect({ connector: a })} key={a.uid}>
          {a.name}
        </button>
      ))}
    </div>
  );
}

export default App;
