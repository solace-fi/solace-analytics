import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import UwpMainnetChart from "./../src/components/charts/UwpMainnetChart"
import UwpAuroraChart from "./../src/components/charts/UwpAuroraChart"
import UwpPolygonChart from "./../src/components/charts/UwpPolygonChart"

const Uwp: NextPage = () => {
  return (
    <div className={styles.container}>
      <h3>UWP Mainnet</h3>
      <UwpMainnetChart/>
      <br/>
      <h3>UWP Aurora</h3>
      <UwpAuroraChart/>
      <br/>
      <h3>UWP Polygon</h3>
      <UwpPolygonChart/>
      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default Uwp
