import SubLayout from "@/components/common/SubLayout"
import Image from 'next/image'
import { ReactElement, useState, useEffect } from "react"
import Button from '@/components/common/Button'
import { isMobile } from "react-device-detect"
import classNames from "classnames"
import {useContract} from '@/hooks'
import {tokenAddr, tokenAbi, zyberAddr, zyberAbi, depositAddr, depositAbi, wethAddr} from '@/constants/constract'
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { formatUnits, parseUnits } from '@ethersproject/units';
import { supportChain } from "@/constants"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Lp() {
    const {account, provider, chainId}: any = useWeb3React();
    const [stakeAmount, setStakeAmount]: any = useState('0');
    const [balance, setBalance]: any = useState(0);
    const [apy, setApy]: any = useState(0);
    const [dailyroi, setDailyroi]: any = useState(0);
    const [stakeInfoAmount, setStakeInfoAmount]: any = useState(0);
    const [alertType, setAlertType]: any = useState('');
    const [alertText, setAlertText]: any = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [withdrawAmount, setWithdrawAmount]: any = useState('0');
    const [allStakeAmount, setAllStakeAmount]: any = useState(0);

    const chefContract: any = useContract(depositAddr, depositAbi);
    const chiContract: any = useContract(tokenAddr, tokenAbi);
    const zbContract: any = useContract(zyberAddr, zyberAbi);

    const fetchData = async () => {
        let staked = await zbContract.callStatic.balanceOf(depositAddr);
        staked = staked * (await chiContract.callStatic.balanceOf(zyberAddr) / await zbContract.callStatic.totalSupply());
        
        let ra = 2000000000000000000000000 / staked * 900 / (900 + 300);
        let apy = ((ra) * ((60 / 12) * 60 * 24 * 365)) * 100;
        let dailyroi = (ra) * ((60 / 12) * 60 * 24) * 100;

        let balance = formatUnits(await zbContract.callStatic.balanceOf(account));
        console.log('staked', await chiContract.callStatic.balanceOf(zyberAddr))

        let stakeInfo = await chefContract.callStatic.userInfo(1, account);
        let allStakeAmount = formatUnits(stakeInfo[0]);
        
        
        
        // setPrice(price);
        setStakeInfoAmount(stakeInfo[0]);
        setAllStakeAmount(allStakeAmount);
        // setStakeInUsd(stakeInUsd);
        setApy(isFinite(apy) ? apy : 0);
        setDailyroi(isFinite(dailyroi) ? dailyroi : 0);
        setBalance(balance);
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

    function onClickStake() {
        
        chefContract.deposit(1, parseUnits(String(stakeAmount)), {from: account, gasLimit: '990000'}).then((res: any) => {
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

    function onClickApprove() {
        zbContract.approve(depositAddr, "115792089237316195423570985008687907853269984665640564039457584007913129639935", { gasLimit: '990000'}).then((res: any) => {
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

    function onClickMaxW() {
        setWithdrawAmount(formatUnits(stakeInfoAmount));
    }

    function onClickClaim() {
        chefContract.withdraw(1, account, { gasLimit: '990000'}).then((res: any) => {
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

    function onClickWithdraw() {
        chefContract.withdraw(1, parseUnits(String(withdrawAmount)), { gasLimit: '990000'}).then((res: any) => {
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

    return (
        <div className="lp text-white">

            

            <style jsx>{`
                .lp {
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
                    .lp {
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
            <div className="c-title text-center">Stake LP</div>
            <div className="c-row flex">
                <div className="c-r-item flex-1">
                    <div className="c-left-title">APR</div>
                    <div className="c-left-value">{apy}%</div>
                    <div className="c-left-desc">Daily ROI {dailyroi}%</div>
                </div>
                <div className="c-r-item flex-1 c-r-right">
                    <div className="c-left-title">Your Balance</div>
                    <div className="c-left-value">{balance} $LP</div>
                </div>
            </div>
            <div className={classNames('cb-row justify-between', isMobile ? '' : 'flex')}>
                <div className="cb-r-item">
                    <div className="cb-r-title">Stake Amount</div>
                    <div className="cb-r-input-box flex items-center">
                        <input value={stakeAmount} onChange={e => setStakeAmount(e.target.value)} className="cb-r-input-val flex-1" type="text" />
                        <div onClick={onClickMax} className="cb-r-input-max">Max</div>
                    </div>
                    <div className="cb-r-mark flex justify-between">
                        <div className="cb-r-label">Your $LP</div>
                        <div className="cb-r-amount">{balance}</div>
                    </div>
                    <div className="cb-r-mark flex justify-between">
                        <div className="cb-r-label">Fees (to buy back)</div>
                        <div className="cb-r-amount">1%</div>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div className="mr-2 flex-1">
                            <Button disabled={+stakeAmount <= 0} onClick={onClickStake}>Stake</Button>
                        </div>
                        <div className="flex-1">
                            <Button onClick={onClickApprove}>Approve</Button>
                        </div>
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
                        <div className="cb-r-label">Locked until</div>
                        <div className="cb-r-amount">~</div>
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

Lp.getLayout = function getLayout(page: ReactElement) {
    return (
        <SubLayout>
            {page}
        </SubLayout>
    )
}
