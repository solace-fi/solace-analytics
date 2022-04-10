import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { format } from "date-fns";
import { useEffect, useState } from "react";

import VotePowerByAccountChart from "./../src/components/charts/VotePowerByAccountChart"
import VotePowerOverTimeChart from "./../src/components/charts/VotePowerOverTimeChart"

const VotePower: NextPage = (props: any) => {
  if(!props || !props.xslocker || Object.keys(props.xslocker).length == 0) return <p>Loading</p>
  const xslocker = props.xslocker
  return (
      <div className={styles.container}>
      <h3>Vote Power By Account</h3>
      <VotePowerByAccountChart xslocker={xslocker}/>
      <h3>Vote Power Over Time</h3>
      <VotePowerOverTimeChart xslocker={xslocker}/>
    </div>
  )
}

export default VotePower
