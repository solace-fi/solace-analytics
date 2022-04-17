import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ethers } from "ethers"
const BN = ethers.BigNumber
const formatUnits = ethers.utils.formatUnits

import Loading from "./../src/components/Loading"
import ExposuresTable from "./../src/components/exposures/ExposuresTable"
import { leftPad, rightPad, formatNumber, createLine } from "./../src/helpers/index"

const Exposures: NextPage = (props: any) => {
  if(!props || !props.swc || Object.keys(props.swc).length == 0 || !props.positions || !props.series) return <Loading/>
  let swc = toFloat(props.swc)
  let protocols = aggregateProtocols(swc, props.positions, props.series)
  let networks = ['ethereum', 'polygon']
  protocols = protocols.filter(protocol => networks.includes(protocol.network))
  return (
    <div className={styles.container}>
      <h3>SWC Exposures by Protocol</h3>
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

const tierMap = ["F", "S", "A", "C"]

function aggregateProtocols(swc:any, positions:any, series:any) {
  // fetch policyholders and policies
  // if the account has multiple policies across chains or products
  // then the last one to be written to the policyOf mapping will be used
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
          premiumsPerYear: 0,
          policies: [],
          positions: []
        }
        protocols.push(protocol)
        // map to series
        var sf = series.data.protocolMap.filter((s:any) => s.appId == p.appId)
        if(sf.length > 1) console.log('protocols series uhh')
        if(sf.length == 0) {
          // unknown protocol
          protocol.tier = "F"
          protocol.category = "unknown"
          protocol.rol = series.data.rateCard[0].rol
        } else {
          var tier = sf[0].tier
          protocol.tier = tierMap[tier]
          protocol.category = sf[0].category
          protocol.rol = series.data.rateCard[tier].rol
        }
      } else protocol = pf[0]

      var balanceUSD = parseFloat(p.balanceUSD)
      var coverLimit = parseFloat(formatUnits(policy.coverLimit,18))
      var totalLossPayoutAmount = Math.min(coverLimit, balanceUSD)
      var premiumsPerYear = totalLossPayoutAmount * protocol.rol
      protocol.balanceUSD += balanceUSD
      protocol.coverLimit += coverLimit
      protocol.totalLossPayoutAmount += totalLossPayoutAmount
      protocol.premiumsPerYear += premiumsPerYear
      p.premiumsPerYear = premiumsPerYear
      protocol.policies.push(policy)
      protocol.positions.push(p)
    })
  })
  protocols.sort((a:any,b:any)=>b.balanceUSD-a.balanceUSD)

  return protocols
}
