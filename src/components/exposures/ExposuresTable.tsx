//import { formatNumber, tooltipFormatterNumber, tooltipLabelFormatterTime, range, formatTimestamp, leftPad, rightPad, calculateWeeklyTicks, xtickLabelFormatter, createLine } from "./../../helpers/index"

import { leftPad, rightPad, formatNumber, createLine } from "./../../helpers/index"

// displays all protocols we have exposure to
const ExposuresTable: any = (props: any) => {
  // output as table
  //var s = `appId                | network              |   balanceUSD | policyholders\n--------------------------------------------------------------------------\n`
  //var s = `appId                | network              |   balanceUSD | coverLimit |  | policyholders\n--------------------------------------------------------------------------\n`
  var s = [
    rightPad('appId', 20),
    rightPad('network', 20),
    rightPad('balanceUSD', 12),
    rightPad('coverLimit', 12),
    //rightPad('tlpa', 12),
    rightPad('policies', 8)
  ].join(' | ')
  var line = createLine(s.length)
  s = `${s}\n${line}\n`
  var fn = formatNumber({decimals:2})
  var sumBalanceUSD = 0
  props.protocols.forEach((protocol:any) => {
    //var appId = rightPad(protocol.appId, 20, ' ')
    //var network = rightPad(protocol.network, 20, ' ')
    //var balanceUSD = leftPad(fn(protocol.balanceUSD), 12, ' ')
    sumBalanceUSD += parseFloat(protocol.balanceUSD)
    //var policyholders = protocol.policyholders
    //s = `${s}${appId} | ${network} | ${balanceUSD} | ${policyholders}\n`

    var s2 = [
      rightPad(protocol.appId, 20),
      rightPad(protocol.network, 20),
      leftPad(fn(protocol.balanceUSD), 12),
      leftPad(fn(protocol.coverLimit), 12),
      //leftPad(fn(protocol.totalLossPayoutAmount), 12),
      rightPad(protocol.policies.length, 8)
    ].join(' | ')
    s = `${s}${s2}\n`

    protocol.policies.forEach((policy:any) => {
      var s3 = ` - policy ${leftPad(policy.policyID, 5)} network ${rightPad(policy.network, 20)}`
      //s = `${s}${s3}\n`
    })
    /*
    protocol.positions.forEach((position:any) => {
      var s4 = ` - position `
    })
    */
  })
  s = `${s}${line}\n                                      total | ${leftPad(fn(sumBalanceUSD+""), 12, ' ')}`
  return <pre>{s}</pre>
}

export default ExposuresTable

const ExposuresRow: any = (props: any) => {

}
