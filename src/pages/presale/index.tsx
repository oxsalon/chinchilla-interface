import Layout from "@/components/common/Layout";
import Image from "next/image";
import { ReactElement, useState, useEffect } from "react";
import Button from "@/components/common/Button";
import { isMobile, isBrowser } from "react-device-detect";
import { useContract } from "@/hooks";
import { nftToken, nftAbi, idoAddr, idoAbi } from "@/constants/constract";
import { formatUnits, parseUnits } from "@ethersproject/units";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { supportChain } from "@/constants";
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("../../constants/whiteList");

const leafNodes = whitelist.map((addr: any) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const root = merkleTree.getRoot();

export default function App() {
  const nftContract: any = useContract(idoAddr, idoAbi);
  const { account, provider, chainId }: any = useWeb3React();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType]: any = useState("");
  const [alertText, setAlertText]: any = useState("");
  const [amount, setAmount]: any = useState("");
  const [ethBalance, setEthBalance] = useState(0);

  const openTip = (options: any) => {
    setOpenSnackbar(true);
    setAlertType(options.type);
    setAlertText(options.text);
  };

  useEffect(() => {
    if (chainId !== supportChain || !account) return;

    const getData = async () => {
      const ethereum = provider.provider;
      const res = await ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setEthBalance(res);
    };

    getData();
  }, [account, chainId]);

  async function onMint() {
    const leaf = keccak256(account);
    const proof = merkleTree.getHexProof(leaf);

    // Verify Merkle Proof
    const isValid = merkleTree.verify(proof, leaf, root);

    if (!isValid) {
      alert("Invalid Merkle Proof - You are not on the whitelist");
      return;
    }

    nftContract
      .claim(account, 1, account, parseUnits("0.1"), proof, {
        from: account,
        gasLimit: "990000",
      })
      .then((res: any) => {
        openTip({
          type: "success",
          text: "The transaction has been sent on the chain",
        });
      })
      .catch((err: any) => {
        openTip({
          type: "error",
          text: "error transaction",
        });
      });
  }

  function onClickMax() {
    setAmount(parseFloat(formatUnits(ethBalance)).toFixed(2));
  }

  async function onContribute() {
    if (amount <= 0) return;
    console.log(parseUnits(amount).toHexString(), 111);
    const ethereum = provider.provider;
    // const gas = await ethereum.request({
    //   method: "eth_estimateGas",
    //   params: [
    //     {
    //       from: account,
    //       to: idoAddr,
    //       value: ,
    //     },
    //   ],
    // });
    // console.log(gas, 2222);
    const res = await ethereum.request({
      method: "eth_sendTransaction",
      params: [
        {
          from: account,
          to: idoAddr,
          value: parseUnits(amount).toHexString(),
          gasPrice: "0x09184e72a000",
          gas: "0x014",
        },
        "latest",
      ],
    });

    console.log(res, 1111);
  }

  return (
    <div className="sale flex items-center">
      <style jsx>{`
        .sale {
          background: #0b062d;
          padding: 120px 50px;
          :global(.sm-img) {
            border-radius: 30px;
          }
          .s-right {
            background: linear-gradient(
              180.11deg,
              #3d2d57 0.09%,
              #130826 96.56%
            );
            border-radius: 26px;
            padding: 30px;
            margin-left: 30px;
          }
          .s-r-title {
            font-size: 36px;
            margin-bottom: 45px;
          }
          .sr-left {
            width: 60%;
            .sr-l-row {
              margin-bottom: 18px;
              .sr-l-item {
                background: #151823;
                border: 1px solid #303241;
                border-radius: 12px;
                padding: 18px 0;
                &:first-child {
                  margin-right: 24px;
                }
                .sr-li-title {
                  color: #a6a0bb;
                }
                .sr-li-value {
                  font-size: 20px;
                  font-weight: 700;
                }
              }
            }
            .sr-l-btn {
              margin-top: 18px;
            }
          }
          .sr-right {
            background: #151823;
            border: 1px solid #303241;
            border-radius: 12px;
            margin-left: 15px;
            padding: 20px 15px;
            .sr-r-title {
              font-size: 20px;
              font-weight: 700;
            }
            .sr-input-tip {
              margin-top: 20px;
              color: #a6a0bb;
            }
            .sr-input-box {
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid #303241;
              border-radius: 12px;
              height: 50px;
              padding: 0 15px;
              margin-top: 10px;
              .sr-input-val {
                background: transparent;
                outline: none;
                margin-left: 10px;
                width: 100%;
              }
              .sr-input-max {
                color: #7635ff;
                font-size: 20px;
                cursor: pointer;
              }
            }
            .sr-link {
              margin-top: 15px;
            }
            .sr-r-btn {
              margin-top: 18px;
            }
          }
        }
        @media (max-width: 960px) {
          .sale {
            padding: 100px 15px;
            :global(.sm-img) {
              display: none;
            }
            .s-right {
              padding: 15px;
              margin-left: 0;
            }
            .s-r-title {
              font-size: 30px;
              margin-bottom: 30px;
            }
            .sr-left {
              width: 100%;
              margin-bottom: 30px;
            }
            .sr-right {
              margin-left: 0;
              padding: 15px;
              .sr-r-title {
                font-size: 20px;
                font-weight: 700;
              }
              .sr-input-tip {
                margin-top: 20px;
                color: #a6a0bb;
              }
              .sr-input-box {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid #303241;
                border-radius: 12px;
                height: 50px;
                padding: 0 15px;
                margin-top: 10px;
                .sr-input-val {
                  background: transparent;
                  outline: none;
                  margin-left: 10px;
                  width: 100%;
                }
                .sr-input-max {
                  color: #7635ff;
                  font-size: 20px;
                }
              }
              .sr-link {
                margin-top: 15px;
              }
              .sr-r-btn {
                margin-top: 18px;
              }
            }
          }
        }
      `}</style>

      <Image
        className="sm-img"
        width={320}
        height={320}
        alt=""
        src="/imgs/app-home-img.png"
      />
      <div className="flex-1 s-right text-white">
        <div className="s-r-title text-center">Presale (ETH)</div>
        <div className={isMobile ? "" : "flex"}>
          <div className="sr-left">
            <div className="sr-l-row text-center flex">
              <div className="sr-l-item flex-1">
                <div className="sr-li-title">total ETH raised</div>
                <div className="sr-li-value">0.00</div>
              </div>
              <div className="sr-l-item flex-1">
                <div className="sr-li-title">pending CHIN</div>
                <div className="sr-li-value">0.00</div>
              </div>
            </div>
            <div className="sr-l-row text-center flex">
              <div className="sr-l-item flex-1">
                <div className="sr-li-title">opens in</div>
                {/* <div className="sr-li-value">0.00</div> */}
              </div>
              <div className="sr-l-item flex-1">
                <div className="sr-li-title">CHIN per ETH</div>
                <div className="sr-li-value">0</div>
              </div>
            </div>
            <div className="sr-l-btn">
              <Button disabled onClick={onMint}>
                Claim presale CHIN
              </Button>
            </div>
          </div>
          <div className="flex-1 sr-right">
            <div className="sr-r-title">Contribute ETH</div>
            <div className="flex sr-input-tip flex justify-between">
              <div>Balance</div>
              <div>{parseFloat(formatUnits(ethBalance)).toFixed(2)}ETH</div>
            </div>
            <div className="sr-input-box flex items-center">
              <Image
                width={32}
                height={32}
                alt=""
                src="/imgs/app-home-eth.png"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="sr-input-val flex-1"
                type="text"
              />
              <div onClick={onClickMax} className="sr-input-max">
                Max
              </div>
            </div>
            <div className="sr-link flex justify-center">
              <div>Bridge ETH</div>
              <Image
                className="sm-img"
                width={24}
                height={24}
                alt=""
                src="/imgs/app-home-link.png"
              />
            </div>
            <div className="sr-r-btn">
              <Button onClick={onContribute}>contribute</Button>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
      >
        <Alert severity={alertType} variant="filled">
          {alertText}
        </Alert>
      </Snackbar>
    </div>
  );
}

App.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
