import { Contract } from '@ethersproject/contracts';

export function getConstract(addr: string, abi: any, library: any, account?: string | undefined) {
    let provider: any;
    if (account) {
      provider = library.getSigner(account).connectUnchecked();
    } else {
      provider = library;
    }
  
    return new Contract(addr, abi, provider);
  }