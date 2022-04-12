import { format } from "date-fns";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const UwpMainnet: any = (props: any) => {

  // csv to json
  function reformatData(csv: any): any {
    var now = Date.now() / 1000
    var start = now - (60 * 60 * 24 * 90) // filter out data points > 3 months ago
    var rows = csv.split('\n')
    var output = []
    for(var i = 1; i < rows.length-1; ++i) {
      var row = rows[i].split(',')
      var timestamp = row[1] - 0
      if(timestamp < start) continue
      output.push({
        timestamp: row[1],
        dai: row[3]-0,
        usdc: row[4]-0,
        usdt: row[5]-0,
        frax: row[6]-0,
        eth: ((row[7]-0)+(row[8]-0))*(row[13]-0)+(row[10]-0)*(row[16]-0),
        wbtc: (row[9]-0)*(row[14]-0),
        slp: (row[11]-0)*(row[17]-0)
      })
    }
    return output
  }

  return (
    <AreaChart width={730} height={250} data={reformatData(props.csv)}
      margin={{ top: 10, right: 30, left:30, bottom: 0 }}>
      <defs>
        <linearGradient id="colorDai" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f2aa36" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#f2aa36" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorUsdc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#748198" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#748198" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorUsdt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#d630e4" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#d630e4" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorFrax" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#89fb4d" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#89fb4d" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#89eacb" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#89eacb" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorWbtc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#fb748e" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#fb748e" stopOpacity={0}/>
        </linearGradient>
        <linearGradient id="colorSlp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#7dc781" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#7dc781" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis
        dataKey="timestamp"
        interval={90}
        axisLine={false}
        tickLine={false}
        tickFormatter={str => format(new Date(str * 1000), "MMM dd")}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tickFormatter={number =>
          number !== 0
            ? `$${parseFloat(number).toLocaleString()}`
            : "0"
        }
        domain={[0, "auto"]}
        dx={3}
        allowDataOverflow={false}
      />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="dai" stroke="#f2aa36" fillOpacity={1} fill="url(#colorDai)" stackId="1"/>
      <Area type="monotone" dataKey="usdc" stroke="#748198" fillOpacity={1} fill="url(#colorUsdc)" stackId="1"/>
      <Area type="monotone" dataKey="usdt" stroke="#d630e4" fillOpacity={1} fill="url(#colorUsdt)" stackId="1"/>
      <Area type="monotone" dataKey="frax" stroke="#89fb4d" fillOpacity={1} fill="url(#colorFrax)" stackId="1"/>
      <Area type="monotone" dataKey="eth" stroke="#89eacb" fillOpacity={1} fill="url(#colorEth)" stackId="1"/>
      <Area type="monotone" dataKey="wbtc" stroke="#fb748e" fillOpacity={1} fill="url(#colorWbtc)" stackId="1"/>
      <Area type="monotone" dataKey="slp" stroke="#7dc781" fillOpacity={1} fill="url(#colorSlp)" stackId="1"/>
    </AreaChart>
  )
}

export default UwpMainnet