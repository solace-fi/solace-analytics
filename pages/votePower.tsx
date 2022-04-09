import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { format } from "date-fns";
import { useEffect, useState } from "react";

import VotePowerByAccountChart from "./../src/components/charts/VotePowerByAccountChart"
import VotePowerOverTimeChart from "./../src/components/charts/VotePowerOverTimeChart"

const VotePower: NextPage = () => {
  var empty: any = {}
  const [data, setData] = useState(empty)

  useEffect(() => {

    fetch("https://stats.solace.fi/xsLocker/")
    .then((data: any) => data.text())
    .then((data: any) => JSON.parse(data))
    .then((data: any) => setData(data))

  }, [])

  return (
      <div className={styles.container}>
      <h3>Vote Power By Account</h3>
      <VotePowerByAccountChart data={data}/>
      <h3>Vote Power Over Time</h3>
      <VotePowerOverTimeChart data={data}/>
    </div>
  )
}

export default VotePower
