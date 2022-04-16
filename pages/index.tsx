import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <p>Welcome to the Solace analytics dashboard. This is a work in progress.</p>
      <p>Click one of the links above to get started.</p>
      <p>Can&apos;t find the info you&apos;re looking for? Reach out in our <a href="">Discord</a> or try the external links below.</p><br/>
      {externalLink("CoinGecko", "https://www.coingecko.com/en/coins/solace")}
      {externalLink("CoinMarketcap", "https://coinmarketcap.com/currencies/solace/")}
      {externalLink("DappRadar", "https://dappradar.com/ethereum/defi/solace-protocol")}
      {externalLink("Defi Llama", "https://defillama.com/protocol/solace")}
      {externalLink("Sushiswap", "https://analytics.sushi.com/tokens/0x501acE9c35E60f03A2af4d484f49F9B1EFde9f40")}
      {externalLink("Uniswap", "https://info.uniswap.org/#/polygon/tokens/0x501acE9c35E60f03A2af4d484f49F9B1EFde9f40")}
      {externalLink("G-UNI", "https://www.sorbet.finance/#/pools/0x38e7e05Dfd9fa3dE80dB0e7AC03AC57Fa832C78A")}
      {externalLink("GYSR", "https://app.gysr.io/pool/0xf54f26ec9657664c098d4a6879d52cc8bdeccc50")}
    </div>
  )
}

export default Home

const externalLink = (text:string, href:string) => (
  <><a target="_blank" rel="noreferrer" href={href}>{text}</a><br/><br/></>
)
