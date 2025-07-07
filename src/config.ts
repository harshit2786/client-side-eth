import { createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected } from "wagmi/connectors"

export const config = createConfig({
  connectors: [injected()],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http("https://eth-mainnet.g.alchemy.com/v2/v882UvmiQLxYV4XrkNEphUgWqUk2yN6f"),
  },
});
