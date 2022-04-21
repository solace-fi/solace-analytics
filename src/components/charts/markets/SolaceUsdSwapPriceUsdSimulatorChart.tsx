import { SwapSimTooltip } from "@components/atoms/SwapSimTooltip";
import { tooltipFormatterNumber } from "@helpers";
import { format } from "date-fns";

import {
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const SolaceUsdSwapPriceUsdSimulatorChart: any = (props: any) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={props.priceByUsd.filter((x: any) => x.price < 1.2)}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <ReferenceLine x={0} stroke="#777777" />
      <ReferenceLine y={props.price} stroke="#777777" />
      <XAxis
        dataKey="usd"
        scale="time"
        type="number"
        domain={["auto", "auto"]}
        axisLine={false}
        tickLine={false}
        tickFormatter={(number) =>
          number !== 0 ? `$${parseFloat(number).toLocaleString()}` : "0"
        }
        stroke="#c0c2c3"
        dy={5}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tickFormatter={(number) =>
          number !== 0 ? `${parseFloat(number).toLocaleString()}` : "0"
        }
        domain={[0, "auto"]}
        dx={3}
        allowDataOverflow={false}
        stroke="#c0c2c3"
      />
      <Tooltip content={<SwapSimTooltip labelPrefix="usd" valueDecimals={4}/>} />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#FFFFFF"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

export default SolaceUsdSwapPriceUsdSimulatorChart;
