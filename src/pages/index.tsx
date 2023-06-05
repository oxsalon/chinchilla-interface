import Image from "next/image";
import {
  useWeb3React,
  Web3ReactHooks,
  Web3ReactProvider,
} from "@web3-react/core";
import { metaMask, hooks } from "@/connectors/metaMask";
import { AddEthereumChainParameter } from "@web3-react/types";
import { ReactElement, useState } from "react";
import Layout from "@/components/common/Layout";
import { isMobile, isBrowser } from "react-device-detect";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { supportChain } from "@/constants";

/**
 * 
 * interface AddEthereumChainParameter {
  chainId: number
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string // 2-6 characters long
    decimals: 18
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[] // Currently ignored.
}
 * 
 * 
 * 
 */

export default function Home() {
  const router = useRouter();
  const { account, chainId } = useWeb3React();
  const [showDiolog, setShowDiolog] = useState(false);

  function onClickLunch() {
    if (account && chainId === supportChain) {
      router.push("/app");
    } else {
      setShowDiolog(true);
    }
  }

  function onClickNft() {
    window.location.href = "https://city.chinchilla.guru";
  }

  return (
    <div>
      <style jsx>{`
        .nav {
          background: url("/imgs/nav-bg.png");
          background-size: 100% 100%;
          .n-left {
            width: 500px;
            .nl-desc {
              color: #e6e6eb;
              line-height: 1.6;
            }
            .n-l-btns {
              font-size: 18px;
              margin-top: 64px;
              .n-l-btn {
                height: 52px;
                padding: 0 30px;
                box-sizing: border-box;
                border: 2px solid #7635ff;
                font-size: 18px;
                line-height: 48px;
                background: linear-gradient(
                  89.92deg,
                  #be35ff 1.29%,
                  #7635ff 99.94%
                );
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                &.primary {
                  border: none;
                  -webkit-text-fill-color: #ffffff;
                  margin-right: 20px;
                  line-height: 52px;
                  background: linear-gradient(
                    89.92deg,
                    #be35ff 1.29%,
                    #7635ff 99.94%
                  );
                }
                &:disabled {
                  opacity: 0.5;
                }
              }
            }
          }
          .n-right {
            width: 600px;
            height: 600px;
            background: url("/imgs/nav-bg2.png");
            background-size: 100% 100%;
          }
        }
        .data {
          padding-bottom: 90px;
          background: #0b062d;
          .d-box {
            width: 1100px;
            border: 1px solid #393556;
            margin: 48px auto 0;
            .d-item {
              width: 33.3333%;
              padding: 56px 48px;
              box-sizing: border-box;
              &.line {
                border-left: 1px solid #393556;
                border-right: 1px solid #393556;
              }
              :global(.d-item-icon) {
                margin: 0 auto;
              }
              .d-i-title {
                font-size: 36px;
                color: #f7f7f7;
                margin-top: 30px;
                line-height: 1.2;
              }
              .d-i-desc {
                font-size: 16px;
                font-weight: 500;
                line-height: 1.6;
                color: #ceccd6;
                margin-top: 16px;
              }
            }
          }
        }
        .app {
          background: #0b062d;
          padding-bottom: 88px;
          .a-left {
            width: 500px;
            margin-right: 100px;
            .a-l-label {
              width: 119px;
              height: 27px;
              line-height: 27px;
              background: rgba(255, 255, 255, 0.7);
              border-radius: 53px 53px 0px 53px;
              font-size: 12px;
              color: #f7f7f7;
              text-align: center;
              margin-bottom: 16px;
            }
            .a-l-title {
              font-size: 80px;
              color: #ffffff;
              line-height: 1;
            }
            .a-l-title-s {
              font-size: 80px;
              color: #7635ff;
              line-height: 1;
              margin-bottom: 48px;
            }
            .a-l-desc {
              font-size: 16px;
              line-height: 19px;
              color: #ffffff;
            }
            .a-l-btn {
              background: linear-gradient(
                89.92deg,
                #be35ff 1.29%,
                #7635ff 99.94%
              );
              border-radius: 31px;
              color: #ffffff;
              font-weight: 800;
              font-size: 12px;
              height: 49px;
              line-height: 49px;
              width: 253px;
              text-align: center;
              margin-top: 43px;
            }
          }
        }
        .feature {
          background: #0b062d;
          padding: 80px 0 100px;
          .f-item-box {
            width: 1100px;
            margin: 0 auto;
            margin-top: 50px;
          }
        }
        .f-title {
          color: #ffffff;
          font-weight: 800;
        }

        @media (max-width: 960px) {
          .nav {
            .n-left {
              width: 100%;
              padding: 0 15px;
            }
            .n-right {
              display: none;
            }
          }
          .data {
            padding: 0 15px;
            .d-box {
              width: 100%;
              margin: 15px auto 0;
              .d-item {
                padding: 15px 10px;
                :global(.d-item-icon) {
                  margin: 0 auto;
                }
                .d-i-title {
                  font-size: 14px;
                }
                .d-i-desc {
                  font-size: 12px;
                }
              }
            }
          }
          .app {
            padding: 30px 15px 0;
            .a-left {
              width: 100%;
              margin-right: 0;
              .a-l-title {
                font-size: 64px;
              }
              .a-l-title-s {
                font-size: 64px;
              }
              .a-l-desc {
                font-size: 16px;
                line-height: 19px;
                color: #ffffff;
              }
            }
          }
          .feature {
            padding: 30px 15px 30px;
            .f-item-box {
              width: 100%;
            }
          }
          .f-title {
          }
        }
      `}</style>

      <div className="nav pt-20 pb-24">
        <div className="flex items-center justify-center">
          <div className="n-left">
            <Image
              alt=""
              src="/imgs/nav-font.png"
              width={375}
              height={120}
            ></Image>
            <div className="nl-desc mt-8">
              On the remote island of Taquile, countless chinchillas live,
              playfulness and laughter being their mainstay. However, a sudden
              catastrophe has infected many of them with a rare and
              never-before-seen virus that is spreading extremely fast. The
              chinchilla population is decreasing at a terrifying rate of 0.001%
              per block, meaning that the total number of chinchillas will drop
              by 7% in just one day.
            </div>
            <div className="n-l-btns text-center flex">
              <button
                onClick={onClickNft}
                className="n-l-btn text-white primary cursor-pointer"
              >
                Mint NFT
              </button>
              <div onClick={onClickLunch} className="n-l-btn cursor-pointer">
                Launch
              </div>
            </div>
          </div>
          <div className="n-right flex items-center justify-center">
            <Image
              alt=""
              src="/imgs/nav-img.png"
              width={400}
              height={400}
            ></Image>
          </div>
        </div>
      </div>

      <div className="data">
        <div className="flex justify-center">
          <Image
            alt=""
            src="/imgs/data-font.png"
            width={700}
            height={124}
          ></Image>
        </div>

        <div className="d-box flex">
          <div className="d-item text-center">
            <Image
              className="d-item-icon"
              alt=""
              src="/imgs/data-icon1.png"
              width={80}
              height={80}
            ></Image>
            <div className="d-i-title">ARB</div>
            <div className="d-i-desc">
              $Chinchilla Token is an ERC20 standard token on the Arbitrum
              chain.
            </div>
          </div>
          <div className="d-item text-center line">
            <Image
              className="d-item-icon"
              alt=""
              src="/imgs/data-icon2.png"
              width={80}
              height={80}
            ></Image>
            <div className="d-i-title">Pledge</div>
            <div className="d-i-desc">
              Stake your $Chinchilla/LP tokens to increase your earnings and
              back burn.
            </div>
          </div>
          <div className="d-item text-center">
            <Image
              className="d-item-icon"
              alt=""
              src="/imgs/data-icon3.png"
              width={80}
              height={80}
            ></Image>
            <div className="d-i-title">Consume</div>
            <div className="d-i-desc">
              $Chinchilla will be burned 0.003% per block.Guara-ntee the
              continued stability of tokens
            </div>
          </div>
        </div>
      </div>

      <div className="app flex items-center justify-center">
        <div className="a-left">
          <div className="a-l-label">Chinchilla</div>
          <div className="a-l-title">Chinchilla</div>
          <div className="a-l-title-s">City</div>
          <div className="a-l-desc">Earn $Chinchilla Every Day</div>
          <div className="a-l-desc">
            Grab some $Chinchillas and put it in the City.
          </div>
          <button onClick={onClickLunch} className="a-l-btn">
            Launch APP
          </button>
        </div>
        {isBrowser && (
          <Image
            alt=""
            src="/imgs/app-img-v2.png"
            width={600}
            height={600}
          ></Image>
        )}
      </div>

      {/* <div className="feature">
        <div className="f-title text-center text-2xl">featured on</div>
        <div className="flex items-center justify-between f-item-box">
          <Image
            alt=""
            src="/imgs/feature-img1.png"
            width={isMobile ? 100 : 300}
            height={51}
          ></Image>
          <Image
            alt=""
            src="/imgs/feature-img2.png"
            width={isMobile ? 100 : 300}
            height={51}
          ></Image>
          <Image
            alt=""
            onClick={() => window.location.href = 'https://www.dextools.io/app/'}
            src="/imgs/feature-img3.png"
            width={isMobile ? 100 : 300}
            height={51}
          ></Image>
        </div>
      </div> */}

      <Dialog open={showDiolog}>
        <DialogContent>
          <DialogContentText>Please, connect your wallet</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDiolog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
