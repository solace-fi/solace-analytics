//import { formatNumber, tooltipFormatterNumber, tooltipLabelFormatterTime, range, formatTimestamp, leftPad, rightPad, calculateWeeklyTicks, xtickLabelFormatter, createLine } from "./../../helpers/index"

import { ethers } from "ethers"
const BN = ethers.BigNumber
const formatUnits = ethers.utils.formatUnits
import { useState } from "react"
import { leftPad, rightPad, formatNumber, createLine } from "./../../helpers/index"

// displays all protocols we have exposure to
const ExposuresTable: any = (props: any) => {
  var s = [
    rightPad('appId', 20),
    rightPad('network', 20),
    rightPad('balanceUSD', 12),
    rightPad('coverLimit', 12),
    rightPad('premiums/yr', 12),
    rightPad('tier', 4),
    rightPad('rol', 4),
    rightPad('category', 16),
    rightPad('policies', 8)
  ].join(' | ')
  var line = createLine(s.length)
  s = `${s}\n${line}\n`
  var tableHead = <pre style={{margin:"0"}}>{s}</pre>
  var tableRows = props.protocols.map((protocol:any) => {
    var key = `protocol_${protocol.appId}_${protocol.network}`
    return <ExposuresRow protocol={protocol} key={key}/>
  })
  var fn2 = formatNumber({decimals:2})
  var sumBalanceUSD = 0
  var sumCoverLimit = 0
  var sumPremiumsPerYear = 0
  for(var i = 0; i < props.protocols.length; ++i) {
    sumBalanceUSD += props.protocols[i].balanceUSD
    sumCoverLimit += props.protocols[i].coverLimit
    sumPremiumsPerYear += props.protocols[i].premiumsPerYear
  }
  var s2 = [
    `${line}\n${leftPad('total', 43)}`,
    leftPad(fn2(sumBalanceUSD+""), 12),
    leftPad('',12),
    leftPad(fn2(sumPremiumsPerYear+""), 12),
  ].join(' | ')
  var tableFooter = <pre style={{margin:"0"}}>{s2}</pre>
  return (<>
    {tableHead}
    {tableRows}
    {tableFooter}
  </>)
}

export default ExposuresTable

const ExposuresRow: any = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)
  var fn2 = formatNumber({decimals:2})
  var protocol = props.protocol

  var key = `protocol_${protocol.appId}_${protocol.network}`
  var s = [
    rightPad(protocol.appId, 20),
    rightPad(protocol.network, 20),
    leftPad(fn2(protocol.balanceUSD), 12),
    leftPad(fn2(protocol.coverLimit), 12),
    leftPad(fn2(protocol.premiumsPerYear), 12),
    leftPad(protocol.tier, 4),
    rightPad(protocol.rol*100, 4),
    rightPad(protocol.category, 16),
    leftPad(protocol.policies.length, 8)
  ].join(' | ')

  if(isOpen) {
    s = `${s} --v  view\n`
    for(var i = 0; i < protocol.policies.length; ++i) {
      var policy = protocol.policies[i]
      var position = protocol.positions[i]
      var s3 = [
        leftPad(`- policyId ${leftPad(policy.policyID, 5)}`, 20),
        rightPad(policy.network, 20),
        leftPad(fn2(position.balanceUSD), 12),
        leftPad(fn2(formatUnits(policy.coverLimit,18)), 12),
        leftPad(fn2(position.premiumsPerYear), 12),
        `policyholder ${policy.policyholder}`
      ].join(' | ')
      s = `${s}${s3}\n`
    }
    return (<div>
      <pre style={{margin:"0",backgroundColor:"#eeeeee"}} onClick={()=>setIsOpen(!isOpen)}>{s}</pre>
      <pre style={{margin:"0"}}>{' '}</pre>
    </div>)
  } else {
    s = `${s} -->  view`
    return (<div>
      <pre style={{margin:"0"}} onClick={()=>setIsOpen(!isOpen)}>{s}</pre>
    </div>)
  }
}
