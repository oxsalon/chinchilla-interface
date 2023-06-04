import Header from '@/components/business/index/Header'
import Footer from '@/components/business/index/Footer'
import { useWeb3React } from '@web3-react/core'
import { useEffect } from 'react';
import {supportChain} from '@/constants'
import { useRouter } from 'next/router'

export default function Layout({ children }: any) {
    const router = useRouter();
    const { account, chainId } = useWeb3React();

    useEffect(() => {
        if(supportChain !== chainId || !account) {
            router.push('/');
        }
    }, [chainId, account])
    
    return (
        <div className='layout'>
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
        </div>
    )

}