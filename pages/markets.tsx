import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import PriceChart from "./../src/components/charts/PriceChart"

const Markets: NextPage = (props: any) => {
  if(!props || !props.markets || Object.keys(props.markets).length == 0) return <p>Loading</p>
  const markets = props.markets
  return (
    <div className={styles.container}>
      <h3>SOLACE Price</h3>
      <PriceChart markets={markets}/>
    </div>
  )
}

export default Markets
