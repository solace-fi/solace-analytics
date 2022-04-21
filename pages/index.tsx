import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import classNames from "classnames";
import SectionTitle from "../src/components/atoms/SectionTitle";
import ExternalLinkButton from "@components/atoms/ExternalLinkButton";

const Home: NextPage = () => {
  return (
    <div className="w-full">
      <div>
        <SectionTitle size="h1">
          Welcome to the Solace analytics dashboard.
        </SectionTitle>
        {/* <p>
      Welcome to the Solace analytics dashboard. This is a work in progress.
    </p> */}
        <p className="text-lg mb-10 leading-8 max-w-xl text-text-dark-secondary">
          This is a work in progress. Click one of the links to the left to get
          started. Can&apos;t find the info you&apos;re looking for? Reach out
          in our{" "}
          <a
            href="https://discord.gg/XKrQgwAjBa"
            className="text-transparent bg-clip-text bg-gradient-to-br from-warmGradientA to-warmGradientB decoration-warmGradientB hover:from-techyGradientA hover:to-techyGradientB hover:decoration-techyGradientB decoration-2 underline-offset-2 underline visited:text-separator-dark"
          >
            Discord
          </a>{" "}
          or try the external links below.
        </p>
        <div className="flex flex-wrap max-w-2xl gap-5">
          {ExternalLinkButton(
            "CoinGecko",
            "https://www.coingecko.com/en/coins/solace"
          )}
          {ExternalLinkButton(
            "CoinMarketcap",
            "https://coinmarketcap.com/currencies/solace/"
          )}
          {ExternalLinkButton(
            "DappRadar",
            "https://dappradar.com/ethereum/defi/solace-protocol"
          )}
          {ExternalLinkButton("Defi Llama", "https://defillama.com/protocol/solace")}
          {ExternalLinkButton(
            "Sushiswap",
            "https://analytics.sushi.com/tokens/0x501acE9c35E60f03A2af4d484f49F9B1EFde9f40"
          )}
          {ExternalLinkButton(
            "Uniswap",
            "https://info.uniswap.org/#/polygon/tokens/0x501acE9c35E60f03A2af4d484f49F9B1EFde9f40"
          )}
          {ExternalLinkButton(
            "G-UNI",
            "https://www.sorbet.finance/#/pools/0x38e7e05Dfd9fa3dE80dB0e7AC03AC57Fa832C78A"
          )}
          {ExternalLinkButton(
            "GYSR",
            "https://app.gysr.io/pool/0xf54f26ec9657664c098d4a6879d52cc8bdeccc50"
          )}
          {ExternalLinkButton(
            "DexScreener - Ethereum",
            "https://dexscreener.com/ethereum/0x9c051f8a6648a51ef324d30c235da74d060153ac"
          )}
          {ExternalLinkButton(
            "DexScreener - Aurora",
            "https://dexscreener.com/aurora/0xddadf88b007b95feb42ddbd110034c9a8e9746f2"
          )}
          {ExternalLinkButton(
            "DexScreener - Polygon",
            "https://dexscreener.com/polygon/0x85efec4ee18a06ce1685abf93e434751c3cb9ba9"
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
