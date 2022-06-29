import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import { CustomTooltip } from "@components/atoms/CustomTooltip";

import {
  formatCurrency,
  range,
  calculateMonthlyTicks,
  xtickLabelFormatter,
} from "./../../../helpers/index";

const PriceChart: any = (props: any) => {
  props.markets["137"] = reformatPolygon(props.markets["137"])
  // transform data
  let dataPerChain: any = {};
  dataPerChain["ethereum"] = reformatData(props.markets["1"], "ethereum");
  dataPerChain["aurora"] = reformatData(props.markets["1313161554"], "aurora");
  dataPerChain["polygon"] = reformatData(props.markets["137"], "polygon");
  dataPerChain["fantom"] = reformatData(props.markets["250"], "fantom");

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
  var keys2 = ["ethereum", "aurora", "polygon", "fantom"];
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
  let xticks = calculateMonthlyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  // polygon has uni v3 and balancer markets
  // use balancer as default, fallback to uni v3
  function reformatPolygon(csv: any): any {
    let rowsIn = csv.trim().split('\n')
    if(rowsIn[0].split(',').length < 7) return csv
    let rowsOut = ['block number,block timestamp,block timestring,price solace/usd,reserve solace,reserve usd']
    for(var i = 1; i < rowsIn.length; ++i) {
      let row = rowsIn[i].split(',');
      let [price, sRes, uRes] = ( (parseFloat(row[6]) == 0)
        ? [row[3], row[4], row[5]]
        : [row[6], row[7], row[8]]
      );
      let rowOut = [row[0], row[1], row[2], price, sRes, uRes].join(',');
      rowsOut.push(rowOut)
    }
    return rowsOut.join('\n')
  }

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
      <Tooltip content={<CustomTooltip valuePrefix="$" valueDecimals={5}/>} />
      <Line
        type="monotone"
        dataKey="ethereum"
        stroke="#ff4400"
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
      <Line
        type="monotone"
        dataKey="fantom"
        stroke="#3845f9"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

export default PriceChart;
