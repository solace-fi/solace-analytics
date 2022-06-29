import { CustomTooltip } from "@components/atoms/CustomTooltip";

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
  range,
  formatTimestamp,
  calculateMonthlyTicks,
  xtickLabelFormatter,
} from "./../../../helpers/index";

const PoliciesChart: any = (props: any) => {
  var [history, yticks] = joinHistories({
    "Ethereum": props.spi.ethereum_v3.history,
    "Aurora": props.spi.aurora_v3.history,
    "Polygon": props.spi.polygon_v3.history,
    "Fantom": props.spi.fantom_v3.history,
  });

  let xticks = calculateMonthlyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  return (
    <LineChart
      width={1000}
      height={250}
      data={history}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        scale="time"
        type="number"
        domain={["auto", "auto"]}
        ticks={xticks}
        stroke="#c0c2c3"
        dy={5}
        tickFormatter={xtickLabelFormatter}
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
        dataKey="Ethereum"
        stroke="#ff4400"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="Aurora"
        stroke="#70d44b"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="Polygon"
        stroke="#8247e5"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="Fantom"
        stroke="#3845f9"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

export default PoliciesChart;

function joinHistories(histories: any) {
  var history: any = [];
  var keys = Object.keys(histories);
  var nextRecord: any = zerosDict(keys);
  var indices: any = zerosDict(keys);
  var ymax = 0;

  while (true) {
    var flag = 99999999999999;
    var minTime = flag;
    for (var k of keys) {
      var i = indices[k];
      if (i < histories[k].length) {
        var time = histories[k][i].timestamp;
        if (time < minTime) minTime = time;
      }
    }
    if (minTime == flag) break;
    for (var k of keys) {
      var i = indices[k];
      if (i < histories[k].length) {
        var time = histories[k][i].timestamp;
        if (time == minTime) {
          var policyCount = parseInt(histories[k][i].policyCount);
          nextRecord[k] = policyCount;
          nextRecord.timestamp = minTime;
          if (policyCount > ymax) ymax = policyCount;
          indices[k]++;
        }
      }
    }
    history.push({ ...nextRecord });
  }

  let now = Date.now() / 1000;
  let start = now - 60 * 60 * 24 * 90; // filter out data points > 3 months ago
  history = history.filter((row: any) => row.timestamp >= start);
  history.sort((a: any, b: any) => a.timestamp - b.timestamp);

  // duplicate latest entry at current timestamp
  let d = Math.floor(Date.now() / 1000);
  let latest = history[history.length - 1];
  if (d - latest.timestamp > 60 * 60) {
    let newLatest = { ...latest };
    newLatest.timestamp = d;
    newLatest.timestring = formatTimestamp(d);
    history.push(newLatest);
  }

  // y ticks
  let interval = 200;
  ymax = Math.ceil(ymax / interval) * interval;
  var yticks = range(0, ymax + 0.01, interval);

  return [history, yticks];
}

function zerosDict(keys: string[]) {
  var d: any = {};
  for (var k of keys) d[k] = 0;
  return d;
}
