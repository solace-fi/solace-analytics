import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers"
const BN = ethers.BigNumber
const formatUnits = ethers.utils.formatUnits

import Loading from "./../src/components/Loading"
import ExposuresTable from "./../src/components/exposures/ExposuresTable"
import { leftPad, rightPad, formatNumber, createLine } from "./../src/helpers/index"

const Exposures: NextPage = (props: any) => {
  if(!props || !props.swc || Object.keys(props.swc).length == 0 || !props.positions) return <Loading/>
  let swc = toFloat(props.swc)
  let protocols = aggregateProtocols(swc, props.positions)
  let networks = ['ethereum', 'polygon']
  protocols = protocols.filter(protocol => networks.includes(protocol.network))
  return (
    <div className={styles.container}>
      <h3>SWC Exposures</h3>
      <p>Note: positions are cached and may not reflect current state</p>
      <ExposuresTable protocols={protocols}/>
      <br/><br/><br/><br/>
    </div>
  )
}

export default Exposures

function toFloat(swc:any) {
  var swc2 = JSON.parse(JSON.stringify(swc))
  var keys = Object.keys(swc2)
  // transform to float
  for(var k of keys) {
    var history = swc2[k].history
    for(var h of history) {
      for(var p of ['coverLimit', 'depositsMade', 'premiumsCharged', 'rewardPointsEarned']) {
        if(h.hasOwnProperty(p)) {
          h[p] = formatUnits(h[p], 18)
        }
      }
    }
  }
  return swc2
}

function aggregateProtocols(swc:any, positions:any) {
  console.log('aggregateProtocols')
  console.log(swc)
  console.log(positions)
  // fetch policyholders and policies
  var policyOf: any = {} // map account -> policy
  swc.swcv1.policies.forEach((policy:any) => {
    policy.product = "swcv1"
    policy.network = "ethereum"
    policyOf[policy.policyholder] = policy
  })
  swc.swcv2.policies.forEach((policy:any) => {
    policy.product = "swcv2"
    policy.network = "polygon"
    policyOf[policy.policyholder] = policy
  })
  /*
  // if the account has multiple policies across chains or products, the last one to be written to the policyOf mapping will be used
  var policyholdersv1: string[] = swc.swcv1.policies.map((policy:any) => {
    policyOf[policy.policyholder] = policy
    return policy.policyholder
  })
  var policyholdersv2: string[] = swc.swcv2.policies.map((policy:any) => {
    policyOf[policy.policyholder] = policy
    return policy.policyholder
  })
  var policyholders: string[] = Array.from(new Set(policyholdersv1.concat(policyholdersv2))).sort()
  */
  var policyholders: string[] = Object.keys(policyOf)


  // aggregate by protocol
  var protocols: any[] = []
  policyholders.forEach((policyholder:any) => {
    var policy = policyOf[policyholder]
    if(!positions.hasOwnProperty(policyholder)) {
      console.log(`uncached policyholder ${policyholder}`)
      return
    }
    var pos = positions[policyholder].positions
    pos.forEach((p:any) => {
      var pf = protocols.filter((protocol:any) => protocol.appId == p.appId && protocol.network == p.network)
      var protocol: any = {}
      if(pf.length > 1) console.log("warning in exposures")
      if(pf.length == 0) {
        // new protocol found. create new entry
        protocol = {
          appId: p.appId,
          network: p.network,
          balanceUSD: 0,
          coverLimit: 0,
          totalLossPayoutAmount: 0,
          policies: [],
          positions: []
        }
        protocols.push(protocol)
      } else protocol = pf[0]

      var balanceUSD = parseFloat(p.balanceUSD)
      protocol.balanceUSD += balanceUSD
      var coverLimit = parseFloat(formatUnits(policy.coverLimit,18))
      protocol.coverLimit += coverLimit
      protocol.totalLossPayoutAmount += Math.min(coverLimit, balanceUSD)
      protocol.policies.push(policy)
      protocol.positions.push(pos)
    })
  })
  protocols.sort((a:any,b:any)=>b.balanceUSD-a.balanceUSD)
  console.log(protocols)

  return protocols
}
