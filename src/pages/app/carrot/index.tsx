import SubLayout from "@/components/common/SubLayout"
import Image from 'next/image'
import { ReactElement, useEffect, useState } from "react"
import Button from '@/components/common/Button'
import classNames from "classnames"
import { isMobile, isBrowser } from 'react-device-detect';
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import {getConstract} from '@/utils/constrract'
import {useContract} from '@/hooks'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { formatUnits, parseUnits } from '@ethersproject/units';
import {tokenAddr, tokenAbi, zyberAddr, zyberAbi, depositAddr, depositAbi, sushiAddr, wethAddr} from '@/constants/constract'
import { supportChain } from '@/constants'

/**
 * 
 * @returns connector,
            chainId,
            accounts,
            isActivating,
            account,
            isActive,
            provider,
            ENSNames,
            ENSName,
            hooks,
 */
export default function Carrot() {
    const {account, provider, chainId}: any = useWeb3React();
    const [balance, setBalance] = useState(0);
    const [price, setPrice] = useState(0);
    const [stakeAmount, setStakeAmount]: any = useState('0');
    const [allStakeAmount, setAllStakeAmount]: any = useState(0);
    const [stakeInfoAmount, setStakeInfoAmount]: any = useState(0);
    const [a, setA]: any = useState(0);
    const [stakeInUsd, setStakeInUsd]: any = useState(0);
    const [withdrawAmount, setWithdrawAmount]: any = useState('0');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [alertType, setAlertType]: any = useState('');
    const [alertText, setAlertText]: any = useState('');
    

    const chefContract: any = useContract(depositAddr, depositAbi);
    const chiContract: any = useContract(tokenAddr, tokenAbi);
    const zbContract: any = useContract(zyberAddr, zyberAbi);
    const sushiContract: any = useContract(sushiAddr, zyberAbi);

    const fetchData = async () => {
        let balance = await chiContract.callStatic.balanceOf(account);
        balance = Number(formatUnits(balance));

        let liqReserves = await zbContract.callStatic.getReserves();
        let liqRate = parseFloat(formatUnits(liqReserves[0])) / parseFloat(formatUnits(liqReserves[1]));

        let sushiLiq = await sushiContract.callStatic.getReserves();
        let t0 = await sushiContract.callStatic.token0();

        if(t0 !== wethAddr) {
            sushiLiq = [sushiLiq[1], sushiLiq[0]];
        }
        let ethPrice = 1 / ((sushiLiq[0] / sushiLiq[1]) / 1e12);
        let price = liqRate * ethPrice;

        let stakeInfo = await chefContract.callStatic.userInfo(0, account);
        let allStakeAmount = stakeInfo[0] * stakeInfo[3] / (10 ** 24) / (10 ** 18);
        let stakeInUsd = allStakeAmount * price;

        setStakeInfoAmount(stakeInfo[0]);
        setA(stakeInfo[3]);
        setBalance(balance);
        setPrice(price);
        setAllStakeAmount(allStakeAmount);
        setStakeInUsd(stakeInUsd);
    }

    const openTip = (options: any) => {
        setOpenSnackbar(true);
        setAlertType(options.type);
        setAlertText(options.text);
    }

    useEffect(() => {
        if(chainId !== supportChain || !account) return;
        fetchData();
    }, [account, chainId])

    async function onClickMax() {
        setStakeAmount(balance);
    }

    function onClickMaxW() {
        setWithdrawAmount(formatUnits(stakeInfoAmount / (10 ** 24) * a));
    }

    function onClickStake() {
        
        chefContract.deposit(0, parseUnits(String(stakeAmount)), {from: account, gasLimit: '990000'}).then((res: any) => {
            openTip({
                type: 'success',
                text: 'The transaction has been sent on the chain'
            });
        }).catch((err: any) => {
            openTip({
                type: 'error',
                text: 'error transaction'
            });
        })
    }

    function onClickClaim() {
        chefContract.deposit(0, account, {from: account, gasLimit: '990000'}).then((res: any) => {
            openTip({
                type: 'success',
                text: 'The transaction has been sent on the chain'
            });
        }).catch((err: any) => {
            openTip({
                type: 'error',
                text: 'error transaction'
            });
        });
    }

    function onClickWithdraw() {
        chefContract.deposit(0, parseUnits(String(withdrawAmount)), {from: account, gasLimit: '990000'}).then((res: any) => {
            openTip({
                type: 'success',
                text: 'The transaction has been sent on the chain'
            });
        }).catch((err: any) => {
            openTip({
                type: 'error',
                text: 'error transaction'
            });
        });
    }

    return (
        <div className="carrot text-white">

            <style jsx>{`
                .carrot {
                    background: rgba(#1C1C1C, 0.6);
                    border: 1px solid rgba(#FFFFFF, 0.4);
                    border-radius: 16px;
                    padding: 120px 50px;
                   .c-title {
                        font-size: 36px;
                        margin-bottom: 30px;
                   } 
                   .c-row {
                        width: 650px;
                        background: #151823;
                        border-radius: 12px;
                        margin: 0 auto;
                        .c-r-item {
                            padding: 20px 35px;
                            .c-left-title {
                                font-size: 20px;
                                font-weight: 700;
                            }
                            .c-left-value {
                                font-size: 32px;
                                font-weight: 700;
                                line-height: 48px;
                                margin-top: 4px;
                                background: linear-gradient(89.92deg, #BE35FF 1.29%, #7635FF 99.94%), #A6A0BB;
                                -webkit-background-clip: text;
                                -webkit-text-fill-color: transparent;
                            }
                            .c-left-desc {
                                font-size: 20px;
                                line-height: 30px;
                                color: rgba(#FFFFFF, 0.7);
                                margin-top: 8px;
                            }
                        }
                        .c-r-right {
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid #303241;
                            border-radius: 12px;
                        }
                   }
                   .cb-row {
                    margin: 10px auto 0;
                    width: 650px;
                    .cb-r-item {
                        width: 310px;
                        background: #151823;
                        border: 1px solid #303241;
                        border-radius: 12px;
                        padding: 20px 15px;
                        .cb-r-title {
                            font-size: 20px;
                            font-weight: 700;
                        }
                        .cb-r-input-box {
                            margin-top: 26px;
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid #303241;
                            border-radius: 12px;
                            height: 46px;
                            padding: 0 15px;
                            .cb-r-input-val {
                                background: transparent;
                                outline: none;
                                margin-left: 10px;
                                width: 100%;
                            }
                            .cb-r-input-max {
                                color: #7635FF;
                                font-size: 20px;
                            }
                        }
                        .cb-r-mark {
                            margin-top: 8px;
                            .cb-r-label {
                                color: #A6A0BB;
                            }
                            .cb-r-amount {
                                font-weight: 700;
                            }
                        }
                    }
                   }
                }
                @media (max-width: 960px) {
                    .carrot {
                        padding: 50px 15px;
                        .c-title {
                                font-size: 30px;
                        } 
                        .c-row {
                                width: 100%;
                                .c-r-item {
                                    padding: 20px 15px;
                                    .c-left-title {
                                        font-size: 16px;
                                    }
                                    .c-left-value {
                                        font-size: 24px;
                                    }
                                    .c-left-desc {
                                        font-size: 14px;
                                    }
                                }
                        }
                        .cb-row {
                            margin: 10px auto 0;
                            width: 100%;
                            .cb-r-item {
                                width: 100%;
                                margin-bottom: 30px;
                            }
                        }
                    }
                }
            `}</style>
            <div className="c-title text-center">Stake CHIN</div>
            <div className="c-row flex">
                <div className="c-r-item flex-1">
                    <div className="c-left-title">APR</div>
                    <div className="c-left-value">Loading...</div>
                    <div className="c-left-desc">Daily ROI 0.5%</div>
                </div>
                <div className="c-r-item flex-1 c-r-right">
                    <div className="c-left-title">Your Balance</div>
                    <div className="c-left-value">${balance * price}</div>
                    <div className="c-left-desc">{balance} $CHIN</div>
                </div>
            </div>
            <div className={classNames('cb-row justify-between', isMobile ? '' : 'flex')}>
                <div className="cb-r-item">
                    <div className="cb-r-title">Stake Amount</div>
                    <div className="cb-r-input-box flex items-center">
                        <input value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} className="cb-r-input-val flex-1" type="text" />
                        <div onClick={onClickMax} className="cb-r-input-max cursor-pointer">Max</div>
                    </div>
                    <div className="cb-r-mark flex justify-between">
                        <div className="cb-r-label">Your $CHIN</div>
                        <div className="cb-r-amount">{balance}</div>
                    </div>
                    <div className="cb-r-mark flex justify-between">
                        <div className="cb-r-label">Fees (to burn)</div>
                        <div className="cb-r-amount">0.5%</div>
                    </div>
                    <div className="mt-4">
                        <Button disabled={+stakeAmount <= 0} onClick={onClickStake}>Stake</Button>
                    </div>
                </div>
                <div className="cb-r-item">
                    <div className="cb-r-title">Withdraw Amount</div>
                    <div className="cb-r-input-box flex items-center">
                        <input value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} className="cb-r-input-val flex-1" type="text" />
                        <div onClick={onClickMaxW} className="cb-r-input-max">Max</div>
                    </div>
                    <div className="cb-r-mark flex justify-between">
                        <div className="cb-r-label">Your Staked</div>
                        <div className="cb-r-amount">{allStakeAmount}</div>
                    </div>
                    <div className="cb-r-mark flex justify-between">
                        <div className="cb-r-label">Staked In USD</div>
                        <div className="cb-r-amount">{stakeInUsd}</div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div className="mr-2 flex-1">
                            <Button disabled={+withdrawAmount <= 0} onClick={onClickWithdraw}>Withdraw</Button>
                        </div>
                        <div className="flex-1">
                            <Button disabled={+withdrawAmount <= 0} onClick={onClickClaim}>Claim</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Snackbar autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={openSnackbar}>
                <Alert severity={alertType} variant='filled'>{alertText}</Alert>
            </Snackbar>
        </div>
    )
}

Carrot.getLayout = function getLayout(page: ReactElement) {
    return (
        <SubLayout>
            {page}
        </SubLayout>
    )
}
