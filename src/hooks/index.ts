import { Contract } from '@ethersproject/contracts'
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import {getConstract} from '@/utils/constrract'
import { useMemo } from 'react'
export function useContract<T extends Contract = Contract>(
    addressOrAddressMap: string | { [chainId: number]: string } | undefined,
    ABI: any
  ): T | null {
    const { provider, account, chainId } = useWeb3React()
  
    return useMemo(() => {
      if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
      let address: string | undefined
      if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
      else address = addressOrAddressMap[chainId]
      if (!address) return null
      try {
        return getConstract(address, ABI, provider, account)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [addressOrAddressMap, ABI, provider, chainId, account]) as T
  }