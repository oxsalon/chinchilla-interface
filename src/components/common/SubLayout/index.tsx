import Layout from '../Layout'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cn from 'classnames'
import { isMobile, isBrowser } from 'react-device-detect';

export default function SubLayout({ children }: any) {
    const router = useRouter();
    return (
        <Layout>

            <div className={cn('content', isMobile ? '' : 'flex')}>
                <style jsx>{`
                    .content {
                        background: black url('/imgs/nav-bg2.png');
                        background-size: 100% 100%;
                        padding: 100px 100px 64px 0;
                        .routers {
                            padding: 0 40px;
                            .route {
                                height: 56px;
                                padding: 0 20px;
                                border-radius: 16px;
                                span {
                                    margin-left: 20px;
                                    font-size: 18px;
                                    font-weight: 500;
                                }
                                &.active {
                                    background: linear-gradient(101.05deg, #1F8EBE -5.36%, #440495 29.46%, #440495 56.03%, #B102CD 81.92%);
                                }
                            }
                        }
                    }
                    @media (max-width: 960px) {
                        .content {
                            padding: 50px 15px 30px;
                            .routers {
                                padding: 10px 0;
                                .route {
                                    height: 32px;
                                    padding: 0 10px;
                                    span {
                                        margin-left: 4px;
                                        font-size: 14px;
                                    }
                                }
                            }
                        }
                    }
                `}</style>
                <div className={cn('routers w-72 text-white', isMobile ? 'flex' : '')}>
                    <Link href={'/app'}>
                        <span className={cn('route flex items-center', router.route === '/app' ? 'active' : '')}>
                            {isBrowser && <Image width={24} height={24} alt='' src='/imgs/dasboard.png' />}
                            <span>Dashboard</span>
                        </span>

                    </Link>
                    <Link href={'/app/carrot'}>
                        <span className={cn('route flex items-center', router.route === '/app/carrot' ? 'active' : '')}>
                            {isBrowser && <Image width={24} height={24} alt='' src='/imgs/trade.png' />}
                            <span>Stake $CHIN</span>
                        </span>
                    </Link>
                    <Link href={'/app/lp'}>
                        <span className={cn('route flex items-center', router.route === '/app/lp' ? 'active' : '')}>
                            {isBrowser && <Image width={24} height={24} alt='' src='/imgs/donate.png' />}
                            <span>Stake LP</span>
                        </span>
                    </Link>
                </div>
                <div className='flex-1'>{children}</div>
            </div>

        </Layout>
    )

}