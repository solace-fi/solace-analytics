import { CustomTooltip } from "@components/atoms/CustomTooltip";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  formatCurrency,
  calculateMonthlyTicks,
  xtickLabelFormatter,
} from "./../../../helpers/index";

const UwpFantom: any = (props: any) => {
  // csv to json
  function reformatData(csv: any): any {
    var now = Date.now() / 1000;
    var start = now - 60 * 60 * 24 * 90; // filter out data points > 3 months ago
    var rows = csv.trim().split("\n");
    var output = [];
    for (var i = 1; i < rows.length; ++i) {
      var row = rows[i].split(",");
      var timestamp = row[1] - 0;
      if (timestamp < start) continue;
      let row2:any = {
        timestamp: row[1],
        dai: row[3] - 0,
        usdc: row[4] - 0,
        usdt: row[5] - 0,
        frax: row[6] - 0,
        eth: ((row[7] - 0) * (row[12] - 0)),
        wbtc: ((row[8] - 0) * (row[13] - 0)),
        ftm: ((row[9] - 0 + (row[10] - 0)) * (row[14] - 0)),
        bpt: ( (row[16] - 0) * (row[17] - 0))
      }
      let keys = ['dai', 'usdc', 'usdt', 'frax', 'eth', 'wbtc', 'ftm', 'bpt'];
      let inf = keys.filter(key => row2[key] == Infinity).length > 0;
      if(!inf) output.push(row2);
    }
    return output;
  }

  let history = reformatData(props.csv);
  let xticks = calculateMonthlyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  return (
    <AreaChart
      width={1200}
      height={300}
      data={history}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorDai" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f2aa36" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f2aa36" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorUsdc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#748198" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#748198" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorUsdt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#d630e4" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#d630e4" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorFrax" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#89fb4d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#89fb4d" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#89eacb" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#89eacb" stopOpacity={0} />
        </linearGradient>,balance SOLACE-ETH BALANCER,price SOLACE-ETH BALANCER
        <linearGradient id="colorWbtc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#fb748e" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#fb748e" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorFtm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3845f9" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3845f9" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorBpt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#000000" stopOpacity={0} />
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
        tickFormatter={formatCurrency({ decimals: 0 })}
        domain={[0, "auto"]}
        allowDataOverflow={false}
        stroke="#c0c2c3"
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={<CustomTooltip valueDecimals={2} chartType={"stackedLine"}/>} />
      <Area
        type="monotone"
        dataKey="dai"
        stroke="#f2aa36"
        fillOpacity={1}
        fill="url(#colorDai)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="usdc"
        stroke="#748198"
        fillOpacity={1}
        fill="url(#colorUsdc)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="usdt"
        stroke="#d630e4"
        fillOpacity={1}
        fill="url(#colorUsdt)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="frax"
        stroke="#89fb4d"
        fillOpacity={1}
        fill="url(#colorFrax)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="eth"
        stroke="#89eacb"
        fillOpacity={1}
        fill="url(#colorEth)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="wbtc"
        stroke="#fb748e"
        fillOpacity={1}
        fill="url(#colorWbtc)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="ftm"
        stroke="#3845f9"
        fillOpacity={1}
        fill="url(#colorFtm)"
        stackId="1"
      />
      <Area
        type="monotone"
        dataKey="bpt"
        stroke="#000000"
        fillOpacity={1}
        fill="url(#colorBpt)"
        stackId="1"
      />
    </AreaChart>
  );
};

export default UwpFantom;
