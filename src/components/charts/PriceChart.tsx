import { format } from "date-fns";

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
  formatCurrency,
  tooltipFormatterCurrency,
  tooltipLabelFormatterTime,
  range,
  leftPad,
  calculateWeeklyTicks,
  xtickLabelFormatter,
} from "./../../helpers/index";

const Price: any = (props: any) => {
  // transform data
  let dataPerChain: any = {};
  dataPerChain["mainnet"] = reformatData(props.markets["1"], "mainnet");
  dataPerChain["aurora"] = reformatData(props.markets["1313161554"], "aurora");
  dataPerChain["polygon"] = reformatData(props.markets["137"], "polygon");

  let keys = Object.keys(dataPerChain);
  let newData = [];
  let indices = zerosDict(keys);
  let lastValues = zerosDict(keys);
  while (true) {
    let flag = 99999999999999;
    let firstTimestamp = flag;
    keys.forEach((key) => {
      let nextIndex = indices[key];
      if (nextIndex >= dataPerChain[key].length) return;
      let nextTimestamp = dataPerChain[key][nextIndex].timestamp - 0;
      if (nextTimestamp < firstTimestamp) firstTimestamp = nextTimestamp;
    });
    if (firstTimestamp == flag) break;
    keys.forEach((key) => {
      let nextIndex = indices[key];
      if (nextIndex >= dataPerChain[key].length) return;
      let nextTimestamp = dataPerChain[key][nextIndex].timestamp - 0;
      if (nextTimestamp == firstTimestamp) {
        lastValues[key] = dataPerChain[key][nextIndex][key];
        indices[key]++;
      }
    });
    let nextData = { ...lastValues };
    nextData.timestamp = firstTimestamp;
    newData.push(nextData);
  }
  let now = Date.now() / 1000;
  let start = now - 60 * 60 * 24 * 90; // filter out data points > 3 months ago
  newData = newData.filter((row) => row.timestamp >= start);

  // calculate y ticks
  let max = 0;
  var keys2 = ["mainnet", "aurora", "polygon"];
  for (var d of newData) {
    for (var k of keys2) {
      var v = parseFloat(d[k] + "");
      if (v > max) max = v;
    }
  }
  max = Math.ceil(max * 50) / 50;
  let yticks = range(0, max + 0.0001, 0.02);
  //let yticks = range(0.04, 0.0501, 0.001)

  let history = newData;
  let xticks = calculateWeeklyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  // csv to json
  function reformatData(csv: any, key: string): any {
    let rows = csv.trim().split("\n");
    let output = [];
    for (let i = 1; i < rows.length; ++i) {
      let row = rows[i].split(",");
      output.push({
        timestamp: parseInt(row[1]),
        [key]: row[3],
      });
    }
    return output;
  }

  function zerosDict(keys: string[]) {
    var d: any = {};
    keys.forEach((key: string) => (d[key] = 0));
    return d;
  }

  return (
    <LineChart
      width={1200}
      height={500}
      data={newData}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
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
        tickFormatter={formatCurrency({ decimals: 3 })}
        scale="linear"
        type="number"
        ticks={yticks}
        allowDataOverflow={false}
        stroke="#c0c2c3"
      />
      <Tooltip
        formatter={tooltipFormatterCurrency({ decimals: 5 })}
        labelFormatter={tooltipLabelFormatterTime}
      />
      <Line
        type="monotone"
        dataKey="mainnet"
        stroke="#000000"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="aurora"
        stroke="#70d44b"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="polygon"
        stroke="#8247e5"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

//content={renderTooltip}
function renderTooltip(args: any) {
  console.log(args);
  return args;
}

export default Price;
