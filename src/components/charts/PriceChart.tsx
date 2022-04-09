import { format } from "date-fns";
import { useEffect, useState } from "react";

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

const Price: any = () => {
  var empty: any[] = []
  const [data, setData] = useState(empty)
  const [isLoading, setLoading] = useState(false)
  var dataPerChain: any = {}

  // csv to json
  function reformatData(csv: any, key: string): any {
    var rows = csv.split('\n')
    var output = []
    for(var i = 1; i < rows.length-1; ++i) {
      var row = rows[i].split(',')
      output.push({
        timestamp: row[1],
        [key]: row[3]-0
      })
    }
    return output
  }

  useEffect(() => {

    fetch("https://stats.solace.fi/fs/?f=markets/mainnet.csv")
    .then((data: any) => data.text())
    .then((data: any) => addData(reformatData(data, "mainnet"), "mainnet"))

    fetch("https://stats.solace.fi/fs/?f=markets/aurora.csv")
    .then((data: any) => data.text())
    .then((data: any) => addData(reformatData(data, "aurora"), "aurora"))

    fetch("https://stats.solace.fi/fs/?f=markets/polygon.csv")
    .then((data: any) => data.text())
    .then((data: any) => addData(reformatData(data, "polygon"), "polygon"))

  }, [])

  function addData(data: any, chain: string) {
    dataPerChain[chain] = data
    var keys = Object.keys(dataPerChain)
    if(keys.length == 3) {
      var newData = []
      var indices = zerosDict(keys)
      var lastValues = zerosDict(keys)
      while(true) {
        var flag = 99999999999999
        var firstTimestamp = flag
        keys.forEach(key => {
          var nextIndex = indices[key]
          if(nextIndex >= dataPerChain[key].length) return
          var nextTimestamp = dataPerChain[key][nextIndex].timestamp-0
          if(nextTimestamp < firstTimestamp) firstTimestamp = nextTimestamp
        })
        if(firstTimestamp == flag) break
        keys.forEach(key => {
          var nextIndex = indices[key]
          if(nextIndex >= dataPerChain[key].length) return
          var nextTimestamp = dataPerChain[key][nextIndex].timestamp-0
          if(nextTimestamp == firstTimestamp) {
            lastValues[key] = dataPerChain[key][nextIndex][key]
            indices[key]++
          }
        })
        var nextData = {...lastValues}
        nextData.timestamp = firstTimestamp
        newData.push(nextData)
      }
      var now = Date.now() / 1000
      var start = now - (60 * 60 * 24 * 90) // filter out data points > 3 months ago
      newData = newData.filter(row => row.timestamp >= start)
      setData(newData)
      setLoading(false)
    }
  }

  function zerosDict(keys: string[]) {
    var d: any = {}
    keys.forEach((key: string) => d[key] = 0);
    return d
  }

  if(isLoading) return <p>Loading...</p>


  return (
    <LineChart
      width={730}
      height={250}
      data={data}
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
