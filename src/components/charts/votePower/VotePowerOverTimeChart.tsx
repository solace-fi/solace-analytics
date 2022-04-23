import { CustomTooltip } from "@components/atoms/CustomTooltip";
import { format } from "date-fns";
import { ethers } from "ethers";
const BN = ethers.BigNumber;
const formatUnits = ethers.utils.formatUnits;

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  formatNumber,
  tooltipFormatterNumber,
  tooltipLabelFormatterTime,
  xtickLabelFormatterWithYear,
  calculateYearlyTicks,
  range,
} from "./../../../helpers/index";

const VotePowerOverTimeChart: any = (props: any) => {
  const keys = Object.keys(props.xslocker);
  if (keys.length == 0) return <p>Loading...</p>;

  let history = reformatData(props.xslocker);
  let xticks = calculateYearlyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  // y ticks
  let interval = 6000000;
  let ymax = history[0].votePower;
  ymax = Math.ceil(ymax / interval) * interval;
  var yticks = range(0, ymax + 0.01, interval);

  return (
    <LineChart
      width={1200}
      height={250}
      data={history}
      margin={{ top: 10, right: 50, left: 30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        scale="time"
        type="number"
        domain={["auto", "auto"]}
        ticks={xticks}
        tickFormatter={xtickLabelFormatterWithYear}
        stroke="#c0c2c3"
        dy={5}
      />
      <YAxis
        tickFormatter={formatNumber({ decimals: 0 })}
        scale="linear"
        type="number"
        ticks={yticks}
        allowDataOverflow={false}
        stroke="#c0c2c3"
      />
      <Tooltip content={<CustomTooltip valueDecimals={0}/>} />
      <Line
        type="monotone"
        dataKey="votePower"
        stroke="#CCCCCC"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

function reformatData(data: any) {
  // fetch timestamps
  let timestamps1: any[] = [];
  const keys = Object.keys(data);
  keys.forEach((key) => {
    data[key].forEach((xslock: any) => {
      timestamps1.push(BN.from(xslock.end).toNumber());
    });
  });
  // sort and filter timestamps
  let now = Math.floor(Date.now() / 1000);
  let timestamps2 = [now];
  timestamps1.forEach((timestamp) => {
    if (timestamp >= now) timestamps2.push(timestamp);
  });
  timestamps2.sort();
  // get sum of votepower at each timestamp
  let votePowers = timestamps2.map((timestamp) =>
    votePowerOfLocks(data, timestamp)
  );
  return votePowers;
}

// given a set of locks and a timestamp, calculates the vote power of the locks at that time
function votePowerOfLocks(data: any, time: any) {
  let sum = BN.from(0);
  Object.keys(data).forEach((key) => {
    data[key].forEach((xslock: any) => {
      sum = sum.add(votePowerOfLock(xslock, time));
    });
  });
  return { timestamp: time, votePower: parseFloat(formatUnits(sum, 18)) };
}

// given a lock and a timestamp, calculates the vote power of the lock at that time
function votePowerOfLock(xslock: any, time: any) {
  // The maximum duration of a lock in seconds.
  const MAX_LOCK_DURATION = 60 * 60 * 24 * 365 * 4; // 4 years
  // The vote power multiplier at max lock in bps.
  const MAX_LOCK_MULTIPLIER_BPS = 40000; // 4X
  // The vote power multiplier when unlocked in bps.
  const UNLOCKED_MULTIPLIER_BPS = 10000; // 1X
  // 1 bps = 1/10000
  const MAX_BPS = 10000;

  let end = BN.from(xslock.end);
  let amount = BN.from(xslock.amount);
  let base = amount.mul(UNLOCKED_MULTIPLIER_BPS).div(MAX_BPS);
  let bonus = end.lte(time)
    ? 0
    : amount
        .mul(end.sub(time))
        .mul(MAX_LOCK_MULTIPLIER_BPS - UNLOCKED_MULTIPLIER_BPS)
        .div(MAX_LOCK_DURATION * MAX_BPS);
  return base.add(bonus);
}

export default VotePowerOverTimeChart;
