import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import UwpMainnetChart from "./../src/components/charts/UwpMainnetChart"
import UwpAuroraChart from "./../src/components/charts/UwpAuroraChart"
import UwpPolygonChart from "./../src/components/charts/UwpPolygonChart"

const Uwp: NextPage = (props: any) => {
  if(!props || !props.uwp || Object.keys(props.uwp).length == 0) return <p>Loading</p>
  const uwp = props.uwp
  return (
    <div className={styles.container}>
      <h3>UWP Mainnet</h3>
      <UwpMainnetChart csv={uwp["1"]}/>
      <br/>
      <h3>UWP Aurora</h3>
      <UwpAuroraChart csv={uwp["1313161554"]}/>
      <br/>
      <h3>UWP Polygon</h3>
      <UwpPolygonChart csv={uwp["137"]}/>
      <br/><br/><br/><br/><br/><br/>
    </div>
  )
}

export default Uwp
