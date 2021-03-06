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

import { SwapSimTooltip } from "@components/atoms/SwapSimTooltip";

const SolaceUsdSwapAmountSimulatorChart: any = (props: any) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={props.solaceByUsd.filter(
        (x: any) =>
          x.solace < 10000000 && x.solace > -10000000 && x.usd < 4000000
      )}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <ReferenceLine x={0} stroke="#777777" />
      <ReferenceLine y={0} stroke="#777777" />
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
      <Tooltip content={<SwapSimTooltip labelPrefix="usd"/>} />
      <Line
        type="monotone"
        dataKey="solace"
        stroke="#FFFFFF"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

export default SolaceUsdSwapAmountSimulatorChart;
