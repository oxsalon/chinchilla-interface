import SubLayout from "@/components/common/SubLayout";
import classNames from "classnames";
import Image from "next/image";
import { ReactElement } from "react";
import { isMobile, isBrowser } from "react-device-detect";
import Button from "../../components/common/Button";

export default function App() {
  return (
    <div className="sale text-white">
      <style jsx>{`
        .sale {
          background: rgba(#1c1c1c, 0.6);
          border: 1px solid rgba(#ffffff, 0.4);
          border-radius: 16px;
          padding: 120px 50px;
          .weight {
            background: linear-gradient(89.92deg, #be35ff 1.29%, #7635ff 99.94%),
              #a6a0bb;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }

        @media (max-width: 960px) {
        }
      `}</style>

      <div className="flex justify-between">
        <div className="text-center w-1/3">
          <div>Market Cap</div>
          <div className="text-3xl mt-2 weight">Loading</div>
        </div>
        <div className="text-center w-1/3">
          <div>$CHIN Price</div>
          <div className="text-3xl mt-2 weight">Loading</div>
        </div>
        <div className="text-center w-1/3">
          <div>Next Rebase</div>
          <div className="text-3xl mt-2 weight">Every Block</div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="text-center w-1/3">
          <div>Circulating Supply</div>
          <div className="text-3xl mt-2 weight">Loading</div>
        </div>
        <div className="text-center w-1/3">
          <div>Staked Rate</div>
          <div className="text-3xl mt-2 weight">~%</div>
        </div>
        <div className="text-center w-1/3">
          <div>Burned Supply</div>
          <div className="text-3xl mt-2 weight">Loading</div>
        </div>
      </div>
    </div>
  );
}

App.getLayout = function getLayout(page: ReactElement) {
  return <SubLayout>{page}</SubLayout>;
};
