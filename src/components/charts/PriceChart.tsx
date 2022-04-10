import { format } from "date-fns";

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const Price: any = (props) => {
  let dataPerChain: any = {}
  dataPerChain["mainnet"] = reformatData(props.markets["1"], "mainnet")
  dataPerChain["aurora"] = reformatData(props.markets["1313161554"], "aurora")
  dataPerChain["polygon"] = reformatData(props.markets["137"], "polygon")

  let keys = Object.keys(dataPerChain)
  let newData = []
  let indices = zerosDict(keys)
  let lastValues = zerosDict(keys)
  while(true) {
    let flag = 99999999999999
    let firstTimestamp = flag
    keys.forEach(key => {
      let nextIndex = indices[key]
      if(nextIndex >= dataPerChain[key].length) return
      let nextTimestamp = dataPerChain[key][nextIndex].timestamp-0
      if(nextTimestamp < firstTimestamp) firstTimestamp = nextTimestamp
    })
    if(firstTimestamp == flag) break
    keys.forEach(key => {
      let nextIndex = indices[key]
      if(nextIndex >= dataPerChain[key].length) return
      let nextTimestamp = dataPerChain[key][nextIndex].timestamp-0
      if(nextTimestamp == firstTimestamp) {
        lastValues[key] = dataPerChain[key][nextIndex][key]
        indices[key]++
      }
    })
    let nextData = {...lastValues}
    nextData.timestamp = firstTimestamp
    newData.push(nextData)
  }
  let now = Date.now() / 1000
  let start = now - (60 * 60 * 24 * 90) // filter out data points > 3 months ago
  newData = newData.filter(row => row.timestamp >= start)

  // csv to json
  function reformatData(csv: any, key: string): any {
    let rows = csv.split('\n')
    let output = []
    for(let i = 1; i < rows.length-1; ++i) {
      let row = rows[i].split(',')
      output.push({
        timestamp: row[1],
        [key]: row[3]-0
      })
    }
    return output
  }
  
  function zerosDict(keys: string[]) {
    var d: any = {}
    keys.forEach((key: string) => d[key] = 0);
    return d
  }

  return (
    <LineChart
      width={730}
      height={250}
      data={newData}
      margin={{ top: 10, right: 30, left:30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
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
      <Tooltip />
      <Line type="monotone" dataKey="mainnet" stroke="#000000" dot={false} strokeWidth={1}/>
      <Line type="monotone" dataKey="aurora" stroke="#70d44b" dot={false} strokeWidth={1}/>
      <Line type="monotone" dataKey="polygon" stroke="#8247e5" dot={false} strokeWidth={1}/>
    </LineChart>
  )
}

export default Price
