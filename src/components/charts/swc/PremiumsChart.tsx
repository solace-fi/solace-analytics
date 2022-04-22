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

const PremiumsChart: any = (props: any) => {
  var [history, yticks] = joinHistories({
    "SWC V1": props.swc.swcv1.history,
    "SWC V2": props.swc.swcv2.history,
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
        tickFormatter={xtickLabelFormatter}
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
      <Tooltip content={<CustomTooltip valuePrefix="$" valueDecimals={2}/>} />
      <Line
        type="monotone"
        dataKey="sum.depositsMade"
        stroke="#ff0000"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="sum.premiumsCharged"
        stroke="#00ff00"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="sum.rewardPointsEarned"
        stroke="#0000ff"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

export default PremiumsChart;

function joinHistories(histories: any) {
  var history: any = [];
  var keys = Object.keys(histories);
  var datakeys = ["depositsMade", "premiumsCharged", "rewardPointsEarned"];
  var frontierHolder: any = zerosDict2D(keys, datakeys);
  var indices: any = zerosDict(keys);

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
          for (var datakey of datakeys) {
            var v = parseFloat(histories[k][i][datakey]);
            frontierHolder[k][datakey] = v;
          }
          indices[k]++;
        }
      }
    }
    var h = sumD2(frontierHolder);
    h.timestamp = minTime;
    history.push(h);
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
  let interval = 2500;
  let ymax = findMax(history);
  ymax = Math.ceil(ymax / interval) * interval;
  var yticks = range(0, ymax + 0.01, interval);

  return [history, yticks];
}

// creates a new dictionary and prefills it with 0 at the given keys
function zerosDict(keys: string[]) {
  var d: any = {};
  //function zerosDict(keys) {
  //  var d = {}
  for (var k of keys) d[k] = 0;
  return d;
}

// creates a new dictionary where the keys are keys1
// each entry is a dictionary created with zerosDict(keys2)
function zerosDict2D(keys1: string[], keys2: string[]) {
  var d: any = {};
  //function zerosDict2D(keys1, keys2) {
  //  var d = {}
  for (var k of keys1) d[k] = zerosDict(keys2);
  return d;
}

// the input was created by zerosDict2D and the entries modified
// adds a new key "sum" to keys1
// its entry is a dictionary like the other keys
// each of those entries is the sum of the other keys1' keys2
function sumD2(dict: any) {
  //function sumD2(dict) {
  var dict2 = JSON.parse(JSON.stringify(dict));
  var keys1 = Object.keys(dict2);
  if (keys1.length == 0) return {};
  var keys2 = Object.keys(dict2[keys1[0]]);
  if (keys2.length == 0) {
    dict2.sum = {};
    return dict2;
  }
  var sum = zerosDict(keys2);
  for (var k2 of keys2) {
    for (var k1 of keys1) {
      sum[k2] += dict2[k1][k2];
    }
  }
  dict2.sum = sum;
  return dict2;
}

// given a list where every entry is a dictionary
// and each entry in that dictionary is a number
// returns the greatest number
function findMax(arr: any) {
  var n = 0;
  for (var i = 0; i < arr.length; ++i) {
    var d = arr[i].sum;
    var keys = Object.keys(d);
    for (var k of keys) {
      var v = d[k];
      if (v > n) n = v;
    }
  }
  return n;
}
