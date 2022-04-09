import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import PriceChart from "./../src/components/charts/PriceChart"

const Markets: NextPage = () => {
  return (
    <div className={styles.container}>
      <h3>SOLACE Price</h3>
      <PriceChart/>
    </div>
  )
}

export default Markets
