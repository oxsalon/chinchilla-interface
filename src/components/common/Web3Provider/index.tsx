import { metaMask, hooks as metaMaskHooks } from '@/connectors/metaMask'
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { ReactNode } from 'react'
import useEagerlyConnect from '@/hooks/useEagerlyConnect';

const connectors: [MetaMask, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks]
]

export default function Web3Provider({ children }: { children: ReactNode }) {
    useEagerlyConnect();
    return (
        <Web3ReactProvider connectors={connectors}>
            {children}
        </Web3ReactProvider>
    )

}