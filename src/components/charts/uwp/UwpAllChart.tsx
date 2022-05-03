import { CustomTooltip } from "@components/atoms/CustomTooltip";

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  formatCurrency,
  calculateMonthlyTicks,
  xtickLabelFormatter,
  range,
} from "./../../../helpers/index";

const UwpMainnet: any = (props: any) => {
  let history = joinData(props.uwp)

  let xticks = calculateMonthlyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  let max = 0;
  for (var d of history) if (d.usd > max) max = d.usd
  let interval = 500000;
  max = Math.ceil(max / interval) * interval;
  let yticks = range(0, max + 1, interval);

  return (
    <LineChart
      width={1200}
      height={300}
      data={history}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUsd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="##FFFFFF" stopOpacity={0.8} />
          <stop offset="95%" stopColor="##FFFFFF" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis
        dataKey="timestamp"
        scale="time"
        type="number"
        domain={["auto", "auto"]}
        ticks={xticks}
        tickFormatter={xtickLabelFormatter}
        stroke="#c0c2c3"
        dy={5}
      />
      <YAxis
        ticks={yticks}
        tickFormatter={formatCurrency({ decimals: 0 })}
        domain={[0, "auto"]}
        allowDataOverflow={false}
        stroke="#c0c2c3"
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomTooltip valueDecimals={2} chartType={"stackedLine"}/>} />
      <Line
        type="monotone"
        dataKey="usd"
        stroke="#FFFFFF"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

// csv to json
function reformatDataEthereum(csv: any): any {
  var rows = csv.split("\n");
  var output = [];
  for (var i = 1; i < rows.length - 1; ++i) {
    var row = rows[i].split(",");
    var usd = (
      (row[3] - 0) + // dai
      (row[4] - 0) + // usdc
      (row[5] - 0) + // usdt
      (row[6] - 0) + // frax
      ((row[7] - 0 + (row[8] - 0)) * (row[13] - 0) + (row[10] - 0) * (row[16] - 0)) + // eth
      ((row[9] - 0) * (row[14] - 0)) + // wbtc
      ((row[11] - 0) * (row[17] - 0)) // slp
    )
    output.push({
      timestamp: row[1],
      usd: usd
    });
  }
  return output;
}

// csv to json
function reformatDataAurora(csv: any): any {
  var rows = csv.split("\n");
  var output = [];
  for (var i = 1; i < rows.length - 1; ++i) {
    var row = rows[i].split(",");
    var usd = (
      (row[3] - 0) + // dai
      (row[4] - 0) + // usdc
      (row[5] - 0) + // usdt
      (row[6] - 0) + // frax
      ((row[7] - 0 + (row[8] - 0)) * (row[14] - 0)) + // eth
      ((row[9] - 0) * (row[15] - 0)) + // wbtc
      ((row[10] - 0) * (row[16] - 0)) + // wnear
      ((row[11] - 0) * (row[17] - 0)) + // aurora
      ((row[12] - 0) * (row[19] - 0)) // tlp
    )
    output.push({
      timestamp: row[1],
      usd: usd
    });
  }
  output.sort((a: any, b: any) => a.timestamp - b.timestamp);
  return output;
}

// csv to json
function reformatDataPolygon(csv: any): any {
  var rows = csv.split("\n");
  var output = [];
  for (var i = 1; i < rows.length - 1; ++i) {
    var row = rows[i].split(",");
    var usd = (
      (row[3] - 0) + // dai
      (row[4] - 0) + // usdc
      (row[5] - 0) + // usdt
      (row[6] - 0) + // frax
      ((row[9] - 0) * (row[13] - 0)) + // eth
      ((row[10] - 0) * (row[14] - 0)) + // wbtc
      ((row[7] - 0 + (row[8] - 0)) * (row[15] - 0)) + // matic
      ((row[11] - 0) * (row[17] - 0)) // guni
    )
    output.push({
      timestamp: row[1],
      usd: usd
    });
  }
  return output;
}

function joinData(uwp: any): any {
  let histories = [
    reformatDataEthereum(uwp["1"]),
    reformatDataAurora(uwp["1313161554"]),
    reformatDataPolygon(uwp["137"])
  ]

  let indices = zerosArr(histories.length)
  let lastValues = zerosArr(histories.length)
  let newData = [];
  while(true) {
    let flag = 99999999999999;
    let firstTimestamp = flag;
    for(var i = 0; i < histories.length; ++i) {
      let nextIndex = indices[i];
      if (nextIndex >= histories[i].length) continue;
      let nextTimestamp = histories[i][nextIndex].timestamp - 0;
      if (nextTimestamp < firstTimestamp) firstTimestamp = nextTimestamp;
    }
    if (firstTimestamp == flag) break;
    for(var i = 0; i < histories.length; ++i) {
      let nextIndex = indices[i];
      if (nextIndex >= histories[i].length) continue;
      let nextTimestamp = histories[i][nextIndex].timestamp - 0;
      if (nextTimestamp == firstTimestamp) {
        lastValues[i] = histories[i][nextIndex].usd;
        indices[i]++;
      }
    }
    let nextData = { timestamp: firstTimestamp, usd: sumArr(lastValues) };
    newData.push(nextData);
  }

  let now = Date.now() / 1000;
  let start = now - 60 * 60 * 24 * 90; // filter out data points > 3 months ago
  newData = newData.filter((row) => row.timestamp >= start);
  return newData;
}

function zerosArr(len: number): any {
  let arr = []
  for(var i = 0; i < len; ++i) arr.push(0)
  return arr
}

function sumArr(arr: number[]): number {
  let s = 0
  for(var i = 0; i < arr.length; ++i) s += arr[i]
  return s
}

export default UwpMainnet;
