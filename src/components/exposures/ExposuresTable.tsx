import { ethers } from "ethers"
const BN = ethers.BigNumber
const formatUnits = ethers.utils.formatUnits
import { useState } from "react"
import { leftPad, rightPad, formatNumber, createLine, range } from "./../../helpers/index"

// displays all protocols we have exposure to
const ExposuresTable: any = (props: any) => {
  var s = [
    rightPad('appId', 20),
    rightPad('network', 20),
    rightPad('balanceUSD', 12),
    rightPad('coverLimit', 12),
    rightPad('premiums/yr', 12),
    rightPad('tier', 4),
    rightPad('rate', 4),
    rightPad('category', 16),
    rightPad('policies', 8)
  ].join(' | ')
  var line = createLine(s.length)
  s = `${s}\n${line}`
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
  var protocol = props.protocol

  const [isOpen, setIsOpen] = useState(false)
  var toggleIsOpen = () => { setIsOpen(!isOpen) }

  var fn2 = formatNumber({decimals:2})
  var mainRowText = [
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
  var mainRowStyle: any = {margin:"0",display:"inline"}
  if(isOpen) mainRowStyle.backgroundColor = "#333333"
  var mainRow = <pre style={mainRowStyle}>{mainRowText}</pre>

  var viewButtonText = isOpen ? " --v view" : " --> view"
  var viewButton = <pre style={mainRowStyle} onClick={toggleIsOpen}>{viewButtonText}</pre>

  var policyStyle: any = {margin:"0",backgroundColor:"#333333"}
  var policies: any = (!isOpen) ? null : range(0, protocol.policies.length).map((i:number) => {
    var policy = protocol.policies[i]
    var position = protocol.positions[i]
    var policyText = [
      leftPad(`- policyId ${leftPad(policy.policyID, 5)}`, 20),
      rightPad(policy.network, 20),
      leftPad(fn2(position.balanceUSD), 12),
      leftPad(fn2(formatUnits(policy.coverLimit,18)), 12),
      leftPad(fn2(position.premiumsPerYear), 12),
      `policyholder ${policy.policyholder}`
    ].join(' | ')
    return <pre style={policyStyle} key={policy.policyID}>{policyText}</pre>
  })

  var spacer = isOpen ? <pre style={{margin:"0"}}>{''}</pre> : undefined

  var numPolicies = isOpen ? policies.length : 0
  var height = `${(numPolicies+1)*24}px`
  return <div style={{}}>
    {mainRow}{viewButton}<br/>
    {policies}
    {spacer}
  </div>
}
