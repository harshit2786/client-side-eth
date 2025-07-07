import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  WagmiProvider,
} from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ABIs } from "./ABI";

const queryClient = new QueryClient();
function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <TotalSupply/>
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

function TotalSupply() {
  const { data } = useReadContract({
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    abi: ABIs,
    functionName: "totalSupply",
  });
  return <div>{data?.toString()}</div>;
}

export default App;
