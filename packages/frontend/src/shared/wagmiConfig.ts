import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { Chain, configureChains, createConfig } from 'wagmi'
import { mainnet, optimism, scrollTestnet, sepolia, localhost} from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'
import { env } from './environment'

/**
 * Wagmi.sh Configuration (https://wagmi.sh/docs)
 */

const allChains: Chain[] = [
    mainnet,
    optimism,
    scrollTestnet,
    sepolia,
    localhost
]

export const defaultChain: Chain | undefined = allChains.find(
  (chain) => env.defaultChain === chain.id,
)

export const isChainSupported = (chainId?: number): boolean => {
  return chainId && env.supportedChains.includes(chainId)
}

export const supportedChains: Chain[] = allChains.filter((chain) => isChainSupported(chain.id))

export const getRpcUrl = (chainId: number): string => {
  return env.rpcUrls[chainId as keyof typeof env.rpcUrls]
}

export const {
  chains: [, ...chains],
  publicClient,
  webSocketPublicClient
} = configureChains(
  Array.from(new Set([mainnet, defaultChain, ...supportedChains])).filter(Boolean) as Chain[],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const rpcUrl = getRpcUrl(chain.id)
        if (!rpcUrl) {
          throw new Error(`No RPC provided for chain ${chain.id}`)
        }
        return { http: rpcUrl }
      },
    }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'EthPrague', // TODO
  chains,
})

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})
