import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import UwpMainnet from "./../src/components/charts/UwpMainnet"
import UwpPolygon from "./../src/components/charts/UwpPolygon"
import UwpAurora from "./../src/components/charts/UwpAurora"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Solace Analytics</title>
        <meta name="description" content="Analytics of the Solace Coverage Protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <br/><h3>UWP Mainnet</h3>
      <UwpMainnet/>
      <br/><h3>UWP Polygon</h3>
      <UwpPolygon/>
      <br/><h3>UWP Aurora</h3>
      <UwpAurora/>
      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default Home
