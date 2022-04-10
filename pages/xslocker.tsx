import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import { ethers } from "ethers"
const BN = ethers.BigNumber

const XsLocker: NextPage = (props: any) => {
  if(!props || !props.xslocker || Object.keys(props.xslocker).length == 0) return <p>Loading</p>
  const xslocker = props.xslocker
  return (
    <div className={styles.container}>
      <XsLockerTable xslocker={xslocker}/>
    </div>
  )
}

export default XsLocker

const XsLockerTable: any = (props) => {
  const CHAIN_IDS = [1,1313161554,137] // mainnet, aurora, polygon
  const CHAIN_NAMES = {
    '1': <a href="https://etherscan.io/address/0x501Ace47c5b0C2099C4464f681c3fa2ECD3146C1"><h2>Ethereum</h2></a>,
    '1313161554': <a href="https://aurorascan.dev/address/0x501Ace47c5b0C2099C4464f681c3fa2ECD3146C1"><h2>Aurora</h2></a>,
    '137': <a href="https://polygonscan.com/address/0x501Ace47c5b0C2099C4464f681c3fa2ECD3146C1"><h2>Polygon</h2></a>,
  }

  const keys = Object.keys(props.xslocker)
  if(keys.length == 0) return <p>Loading...</p>

  const [sumAmountAllChains, tables] = tally(props.xslocker)

  return (
    <div>
      {CHAIN_IDS.map(chainID => (
        <div key={`xslocker_table_chainID_${chainID}`}>
          {CHAIN_NAMES[chainID]}
          {tables[chainID]}
        </div>
      ))}
      <pre>{`all chains: ${formatAmount(sumAmountAllChains, 18)}\n`}</pre>
    </div>
  )
}

const tally: any = (data) => {
  let sumAmountAllChains = BN.from(0)
  let tables = {}
  const keys = Object.keys(data)
  keys.forEach(key => {
    let sumAmountChain = BN.from(0)
    let s = '        id:       SOLACE | Expiration\n--------------------------------------\n'
    data[key].forEach(xslock => {
      sumAmountChain = sumAmountChain.add(xslock.amount)
      sumAmountAllChains = sumAmountAllChains.add(xslock.amount)
      s = `${s}${formatNumber(xslock.xsLockID)}: ${formatAmount(xslock.amount, 18)} | ${formatEnd(xslock.end)}\n`
    })
    s = `${s}--------------------------------------\n     total: ${formatAmount(sumAmountChain, 18)}\n`
    tables[key] = <pre>{s}</pre>
  })
  return [sumAmountAllChains, tables]
}

function formatNumber(n) {
  var s = BN.from(n).toString();
  while(s.length < 10) s = ' ' + s;
  return s;
}

function formatAmount(amount, decimals) {
  var d = BN.from(1);
  for(var i = 0; i < decimals; ++i) d = d.mul(10);
  var s = BN.from(amount).div(d).toNumber().toLocaleString();
  while(s.length < 12) s = ' ' + s;
  return s;
}

function formatEnd(end) {
  var d = Date.now();
  var e = BN.from(end).toNumber()*1000;
  if(d >= e) return "0";
  return (new Date(e).toDateString()).substring(4);
}
