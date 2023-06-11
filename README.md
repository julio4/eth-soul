# Hello Prague

We have detailed the description of the project on the DevFolio page, feel free to go and see!

https://devfolio.co/projects/soul-82cf


Diagram of the interactions between the components of our project

![Diagram here](https://github.com/julio4/prague/blob/main/assets/schema_eth_prague_datagraph.png?raw=true)

Mathematical formula for tokenomics

![Graph here](https://github.com/julio4/prague/blob/main/assets/tokenomics_formula.png?raw=true)

## Sepolia

Contract link on Sepolia : https://sepolia.etherscan.io/address/0x9F8865559f2b22F3883e162bEbe80F6069Dd9Dc9

## Scroll

Contract link on Scroll : https://blockscout.scroll.io/address/0x4C4d27907F7C18DF4C928a33C6EFA668a7d6014A

## Optimism

Contract link on Optimism : https://optimistic.etherscan.io/address/0x9F8865559f2b22F3883e162bEbe80F6069Dd9Dc9


### If you want to run the project on localhost

→ 1. Duplicate this file and rename it to .env.local
→ 2. Define your preferred chain-ids and set respective RPCs (preset with ankr.com)
→ 3. Make sure to also define those environment variables on your deployment

IMPORTANT: To use those variables in the code:
→ 1. Add them in src/shared/environment.ts
→ 2. And always import env from @shared/environment (not from process)
Flag to differentiate dev/demo/prod environments (i.e. for analytics)
NEXT_PUBLIC_PRODUCTION_MODE=false

The current deployment url (i.e. useful for calling Next.js API routes)
NEXT_PUBLIC_URL=http://localhost:3000/

The default chain & all supported ones wagmi, rainbowkit, and the useDeployments will use
IMPORTANT: All respective RPC-urls must be defined below & hardhat deployments must be existent
NEXT_PUBLIC_DEFAULT_CHAIN=1337
NEXT_PUBLIC_SUPPORTED_CHAINS=[1337, 11155111, 10, 534353]

NEXT_PUBLIC_RPC_1337=http://127.0.0.1:8545/          # Hardhat RPC
NEXT_PUBLIC_RPC_1=https://rpc.ankr.com/eth          # Mainnet RPC (IMPORTANT: Always needed, even if unsupported, i.e. for ENS-resolving)

NEXT_PUBLIC_RPC_11155111=https://rpc.ankr.com/eth_sepolia
NEXT_PUBLIC_RPC_10=https://rpc.ankr.com/optimism
NEXT_PUBLIC_RPC_534353=https://rpc.ankr.com/scroll_testnet

#NEXT_PUBLICRPC{CHAINID}=TODO
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE

GRAPHQL_ENDPOINT="https://api.studio.thegraph.com/query/48177/selsubgraph/version/latest"