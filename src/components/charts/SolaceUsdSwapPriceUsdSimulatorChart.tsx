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

const SolaceUsdSwapPriceUsdSimulatorChart: any = (props: any) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={props.priceByUsd.filter((x: any) => x.price < 1.20)}
      margin={{ top: 10, right: 30, left:30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <ReferenceLine x={0} stroke="black" />
      <ReferenceLine y={props.price} stroke="black" />
      <XAxis
        dataKey="usd"
        scale="time"
        type="number"
        domain={['auto','auto']}
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
      <Line type="monotone" dataKey="price" stroke="#000000" dot={false} strokeWidth={1}/>
    </LineChart>
  )
}

export default SolaceUsdSwapPriceUsdSimulatorChart
