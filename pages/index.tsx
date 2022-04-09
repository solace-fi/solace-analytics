import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import UwpMainnetChart from "./../src/components/charts/UwpMainnetChart"
import UwpPolygonChart from "./../src/components/charts/UwpPolygonChart"
import UwpAuroraChart from "./../src/components/charts/UwpAuroraChart"
import PriceChart from "./../src/components/charts/PriceChart"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Solace Analytics</title>
        <meta name="description" content="Analytics of the Solace Coverage Protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br/><h3>SOLACE Price</h3>
      <PriceChart/>
      <br/><h3>UWP Mainnet</h3>
      <UwpMainnetChart/>
      <br/><h3>UWP Polygon</h3>
      <UwpPolygonChart/>
      <br/><h3>UWP Aurora</h3>
      <UwpAuroraChart/>
      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default Home
