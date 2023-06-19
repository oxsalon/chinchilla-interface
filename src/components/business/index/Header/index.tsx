import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { isMobile, isBrowser } from 'react-device-detect';
import { AddEthereumChainParameter } from '@web3-react/types'
import { metaMask, hooks } from '@/connectors/metaMask'
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { supportChain, testChain } from '@/constants'

export default function Header() {
    const { account, chainId } = useWeb3React();
    const router = useRouter();

    const shopAddr = (addr: string) => {
        console.log(`${addr.substring(0, 4)}...${addr.substring(14)}`)
        return `${addr.substring(0, 4)}...${addr.substring(addr.length - 4)}`;
    }

    function onConnect() {
        const AddEthereumChainParameter: AddEthereumChainParameter = {
            chainId: supportChain,
            chainName: supportChain === testChain ? 'Arbitrum Goerli Testnet' : 'Arbitrum',
            nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
            },
            rpcUrls: [supportChain === testChain ? 'https://goerli-rollup.arbitrum.io/rpc' : 'https://arb1.arbitrum.io/rpc']
        }
        metaMask.activate(AddEthereumChainParameter).catch(() => {
            console.debug('Failed to connect to metamask')
        })
    }

    function goPresale() {
        if (account && chainId === supportChain) {
            router.push("/presale");
        } else {
            alert('Please connect wallet');
        }
    }
    return (
        <div className='flex items-center header'>
            <style jsx>{`
                .header {
                    height: 83px;
                    background-color: #080134;
                    padding: 0 88px;
                    border-bottom: 1px solid #393556;
                    
                    .router-item {
                        height: 40px;
                        width: 120px;
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 31px;
                        .ri-text {
                            margin-left: 6px;
                        }
                        &.actice {
                            background: linear-gradient(89.92deg, #BE35FF 1.29%, #7635FF 99.94%), rgba(255, 255, 255, 0.1);
                        }
                    }
                    .connect-btn {
                        border-radius: 100px;
                        color: #FFFFFF;
                        border: 2px solid #7635FF;
                        font-size: 14px;
                        height: 40px;
                        color: #BE35FF;
                        line-height: 1;
                        background-image: linear-gradient(89.92deg, #BE35FF, #7635FF);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        width: 160px;
                    }
                }
                @media (max-width: 960px) {
                    .header {
                        height: 50px;
                        padding: 0 15px;
                        .logo-box {
                            margin-right: 12px;
                        }
                        .router-item {
                            height: 32px;
                            font-size: 12px;
                            width: 46px;
                            border-radius: 20px;
                            .ri-text {
                                margin-left: 4px;
                            }
                        }
                        .connect-btn {
                            border-radius: 40px;
                            font-size: 14px;
                            height: 32px;
                            padding: 0 15px;
                            font-size: 12px;
                        }
                    }
                }
            `}</style>

            <div className='cursor-pointer logo-box'><Image onClick={() => { router.push('/') }} width={190} height={40} alt='' src='/imgs/logo.png' /></div>
            <div className='flex-1 justify-end flex items-center'>
                <Link className={cn('text-white', isMobile ? 'mr-3' : 'mr-8')} href={'/'}>
                    <span className={cn('router-item flex items-center justify-center')}>
                        {isBrowser && <Image width={24} height={24} alt='' src='/imgs/header-icon1.png' />}
                        <span className='ri-text'>Buy</span>
                    </span>
                </Link>
                <a onClick={goPresale} className={cn('text-white', isMobile ? 'mr-4' : 'mr-20')} href="javascript:void(0);">
                    <span className={cn('router-item flex items-center justify-center', router.route.includes('/presale') ? 'actice' : '')}>
                        {isBrowser && <Image width={24} height={24} alt='' src='/imgs/header-icon2.png' />}
                        <span className='ri-text'>Presale</span>
                    </span>
                </a>
                {
                    (account && chainId === supportChain) ? 
                    (<div className='cursor-pointer connect-btn box-border items-center justify-center flex font-bold'>{ shopAddr(account) }</div>) 
                    : (<div onClick={onConnect} className='cursor-pointer connect-btn box-border items-center justify-center flex font-bold'>Connect</div>)
                }
            </div>
        </div>
    )
}