import { format } from "date-fns";
import { ethers } from "ethers"
const BN = ethers.BigNumber
const formatUnits = ethers.utils.formatUnits

import {
  PieChart,
  Pie,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const VotePowerByAccountChart: any = (props) => {

  const keys = Object.keys(props.xslocker)
  if(keys.length == 0) return <p>Loading...</p>

  let [chartData, tableData] = reformatData(props.xslocker)

  return (
    <div>
      <PieChart
        width={400}
        height={400}
      >
        <Pie
          dataKey="votePower"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
      {tableData}
    </div>
  )
}

function reformatData(data) {
  let keys = Object.keys(data)
  let owners = {}
  let now = Math.floor(Date.now()/1000)
  keys.forEach(chainID => {
    data[chainID].forEach(xslock => {
      if(!owners.hasOwnProperty(xslock.owner)) owners[xslock.owner] = BN.from(0)
      owners[xslock.owner] = owners[xslock.owner].add(votePowerOfLock(xslock, now))
    })
  })
  let ownerArr = Object.keys(owners).map(owner => {
    return {name: owner, votePower: Math.floor(formatUnits(owners[owner],18)-0)}
  })
  ownerArr.sort((a,b) => b.votePower - a.votePower)

  let tableData = 'owner                                      | vote power\n---------------------------------------------------------'
  let powerSum = 0
  ownerArr.forEach(owner => {
    powerSum += owner.votePower
    tableData = `${tableData}\n${owner.name} | ${formatAmount(owner.votePower)}`
  })
  tableData = `${tableData}\n---------------------------------------------------------\n                                     total | ${powerSum}`
  let tableData2 = <pre>{tableData}</pre>

  return [ownerArr, tableData2]
}

function formatAmount(n) {
  let s = n.toLocaleString()
  while(s.length < 12) s = ' ' + s
  return s
}

// given a lock and a timestamp, calculates the vote power of the lock at that time
function votePowerOfLock(xslock, time) {
  // The maximum duration of a lock in seconds.
  const MAX_LOCK_DURATION = 60 * 60 * 24 * 365 * 4; // 4 years
  // The vote power multiplier at max lock in bps.
  const MAX_LOCK_MULTIPLIER_BPS = 40000;  // 4X
  // The vote power multiplier when unlocked in bps.
  const UNLOCKED_MULTIPLIER_BPS = 10000; // 1X
  // 1 bps = 1/10000
  const MAX_BPS = 10000;

  let end = BN.from(xslock.end)
  let amount = BN.from(xslock.amount)
  let base = amount.mul(UNLOCKED_MULTIPLIER_BPS).div(MAX_BPS)
  let bonus = (end.lte(time))
    ? 0
    : (amount.mul(end.sub(time)).mul(MAX_LOCK_MULTIPLIER_BPS-UNLOCKED_MULTIPLIER_BPS).div(MAX_LOCK_DURATION*MAX_BPS))
  return base.add(bonus)
}

export default VotePowerByAccountChart
