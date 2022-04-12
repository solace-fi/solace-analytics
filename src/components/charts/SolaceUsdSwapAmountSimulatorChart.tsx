import { format } from "date-fns";

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";

const SolaceUsdSwapAmountSimulatorChart: any = (props: any) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={props.solaceByUsd.filter((x: any) => x.solace < 10000000 && x.solace > -10000000)}
      margin={{ top: 10, right: 30, left:30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <ReferenceLine x={0} stroke="black" />
      <ReferenceLine y={0} stroke="black" />
      <XAxis
        dataKey="usd"
        axisLine={false}
        tickLine={false}
        tickFormatter={number =>
          number !== 0
            ? `$${parseFloat(number).toLocaleString()}`
            : "0"
        }
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tickFormatter={number =>
          number !== 0
            ? `${parseFloat(number).toLocaleString()}`
            : "0"
        }
        domain={[0, "auto"]}
        dx={3}
        allowDataOverflow={false}
      />
      <Tooltip />
      <Line type="monotone" dataKey="solace" stroke="#000000" dot={false} strokeWidth={1}/>
    </LineChart>
  )
}

export default SolaceUsdSwapAmountSimulatorChart
