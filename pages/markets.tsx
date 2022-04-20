import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Loading from "./../src/components/Loading";
import PriceChart from "./../src/components/charts/PriceChart";
import SolaceUsdSwapAmountSimulatorChart from "./../src/components/charts/SolaceUsdSwapAmountSimulatorChart";
import SolaceUsdSwapPriceUsdSimulatorChart from "./../src/components/charts/SolaceUsdSwapPriceUsdSimulatorChart";
import SolaceUsdSwapPriceSolaceSimulatorChart from "./../src/components/charts/SolaceUsdSwapPriceSolaceSimulatorChart";
import SectionTitle from "@components/atoms/SectionTitle";

const Markets: NextPage = (props: any) => {
  if (!props || !props.markets || Object.keys(props.markets).length == 0)
    return <Loading />;
  const markets = props.markets;
  return (
    <div className={styles.container}>
      <SectionTitle size="h4">SOLACE Price</SectionTitle>
      <PriceChart markets={markets} />
      <SectionTitle size="h4">Swap Simulator</SectionTitle>
      <SwapSimulator markets={markets} />
    </div>
  );
};

export default Markets;

const SwapSimulator: any = (props: any) => {
  let csv = props.markets["1"].split("\n");
  let latest = csv[csv.length - 2].split(",");
  let mainnetReserveSolace = parseFloat(latest[4]);
  let mainnetReserveUsd = parseFloat(latest[5]);
  let mainnetSims = simulateUniswapV2(mainnetReserveSolace, mainnetReserveUsd);

  csv = props.markets["1313161554"].split("\n");
  latest = csv[csv.length - 2].split(",");
  let auroraReserveSolace = parseFloat(latest[4]);
  let auroraReserveUsd = parseFloat(latest[5]);
  let auroraSims = simulateUniswapV2(auroraReserveSolace, auroraReserveUsd);

  return (
    <>
      <p className="text-text-dark-secondary max-w-md">
        Note: negative amount means tokens transfer from pool to you, positive
        amount means tokens transfer from you to pool.
      </p>

      <SectionTitle size="h5">Mainnet Sushiswap</SectionTitle>
      <p className="my-2 font-semibold">{`This pool has ${Math.floor(
        mainnetReserveSolace
      ).toLocaleString()} SOLACE and ${Math.floor(
        mainnetReserveUsd
      ).toLocaleString()} USD`}</p>
      <p className="my-2 font-semibold">
        Removing/adding X USD will cost/give me Y SOLACE
      </p>
      <SolaceUsdSwapAmountSimulatorChart
        solaceByUsd={mainnetSims.solaceByUsd}
      />
      <p className="my-2 font-semibold">
        Removing/adding X USD will change the SOLACE/USD price to Y
      </p>
      <SolaceUsdSwapPriceUsdSimulatorChart
        priceByUsd={mainnetSims.priceByUsd}
        price={mainnetSims.price}
      />
      <p className="my-2 font-semibold">
        Removing/adding X SOLACE will change the SOLACE/USD price to Y
      </p>
      <SolaceUsdSwapPriceSolaceSimulatorChart
        priceBySolace={mainnetSims.priceBySolace}
        price={mainnetSims.price}
      />

      <SectionTitle size="h5">Aurora Trisolaris</SectionTitle>
      <p className="my-2 font-semibold">{`This pool has ${Math.floor(
        mainnetReserveSolace
      ).toLocaleString()} SOLACE and ${Math.floor(
        mainnetReserveUsd
      ).toLocaleString()} USD of NEAR`}</p>
      <p className="my-2 font-semibold">
        Removing/adding X USD will cost/give me Y SOLACE
      </p>
      <SolaceUsdSwapAmountSimulatorChart solaceByUsd={auroraSims.solaceByUsd} />
      <p className="my-2 font-semibold">
        Removing/adding X USD will change the SOLACE/USD price to Y
      </p>
      <SolaceUsdSwapPriceUsdSimulatorChart
        priceByUsd={auroraSims.priceByUsd}
        price={auroraSims.price}
      />
      <p className="my-2 font-semibold">
        Removing/adding X SOLACE will change the SOLACE/USD price to Y
      </p>
      <SolaceUsdSwapPriceSolaceSimulatorChart
        priceBySolace={auroraSims.priceBySolace}
        price={auroraSims.price}
      />
    </>
  );
};

function simulateUniswapV2(reserveSolace: number, reserveUsd: number) {
  let price = reserveUsd / reserveSolace;
  let priceByUsd = [{ price: price, usd: 0 }];
  let priceBySolace = [{ price: price, solace: 0 }];
  let solaceByUsd = [{ solace: 0, usd: 0 }];

  // solace out / usd in
  let step = 100000.0;
  let max = reserveSolace;
  for (let solaceOut = step; solaceOut < max; solaceOut += step) {
    let usdIn = getAmountIn(solaceOut, reserveUsd, reserveSolace);
    let newReserveSolace = reserveSolace - solaceOut;
    let newReserveUsd = reserveUsd + usdIn;
    let newPrice = newReserveUsd / newReserveSolace;
    solaceByUsd.push({ solace: -solaceOut, usd: usdIn });
    priceByUsd.push({ price: newPrice, usd: usdIn });
    priceBySolace.push({ price: newPrice, solace: -solaceOut });
  }
  // usd out / solace in
  step = 10000.0;
  max = reserveUsd;
  for (let usdOut = step; usdOut < max; usdOut += step) {
    let solaceIn = getAmountIn(usdOut, reserveSolace, reserveUsd);
    let newReserveSolace = reserveSolace + solaceIn;
    let newReserveUsd = reserveUsd - usdOut;
    let newPrice = newReserveUsd / newReserveSolace;
    solaceByUsd.push({ solace: solaceIn, usd: -usdOut });
    priceByUsd.push({ price: newPrice, usd: -usdOut });
    priceBySolace.push({ price: newPrice, solace: solaceIn });
  }
  solaceByUsd.sort((a, b) => a.usd - b.usd);
  priceByUsd.sort((a, b) => a.usd - b.usd);
  priceBySolace.sort((a, b) => a.solace - b.solace);

  return { price, solaceByUsd, priceByUsd, priceBySolace };
}

/*
// given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
    require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
    require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
    uint amountInWithFee = amountIn.mul(997);
    uint numerator = amountInWithFee.mul(reserveOut);
    uint denominator = reserveIn.mul(1000).add(amountInWithFee);
    amountOut = numerator / denominator;
}

// given an output amount of an asset and pair reserves, returns a required input amount of the other asset
function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
    require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
    require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
    uint numerator = reserveIn.mul(amountOut).mul(1000);
    uint denominator = reserveOut.sub(amountOut).mul(997);
    amountIn = (numerator / denominator).add(1);
}
*/

function getAmountOut(amountIn: number, reserveIn: number, reserveOut: number) {
  let amountInWithFee = amountIn * 997;
  let numerator = amountInWithFee * reserveOut;
  let denominator = reserveIn * 1000 + amountInWithFee;
  let amountOut = numerator / denominator;
  return amountOut;
}

function getAmountIn(amountOut: number, reserveIn: number, reserveOut: number) {
  let numerator = reserveIn * amountOut * 1000;
  let denominator = (reserveOut - amountOut) * 997;
  let amountIn = numerator / denominator + 1;
  return amountIn;
}
