import { format } from "date-fns";

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
  tooltipFormatterNumber,
  tooltipLabelFormatterTime,
  range,
  calculateWeeklyTicks,
  xtickLabelFormatter,
} from "./../../helpers/index";

const CommunityChart: any = (props: any) => {
  let data: any[] = props.community;
  let now = Date.now() / 1000;
  let start = now - 60 * 60 * 24 * 90; // filter out data points > 3 months ago
  data = data.filter((row: any) => row.timestamp >= start);
  data.sort((a: any, b: any) => a.timestamp - b.timestamp);

  let max = 0;
  for (var d of data) {
    if (d.Discord > max) max = d.Discord;
    if (d.Twitter > max) max = d.Twitter;
  }
  max = Math.ceil(max / 1000) * 1000;
  let ticks = range(0, max + 1, 1000);

  let history = data;
  let xticks = calculateWeeklyTicks(
    history[0].timestamp,
    history[history.length - 1].timestamp
  );

  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="timestamp"
        scale="time"
        ticks={xticks}
        tickFormatter={xtickLabelFormatter}
        stroke="#c0c2c3"
        dy={5}
      />
      <YAxis
        tickFormatter={formatNumber({ decimals: 0 })}
        domain={[0, "5000"]}
        ticks={ticks}
        scale="linear"
        type="number"
        allowDataOverflow={false}
        stroke="#c0c2c3"
      />
      <Tooltip
        formatter={tooltipFormatterNumber({ decimals: 0 })}
        labelFormatter={tooltipLabelFormatterTime}
      />
      <Line
        type="monotone"
        dataKey="Twitter"
        stroke="#34aaf3"
        dot={false}
        strokeWidth={1}
      />
      <Line
        type="monotone"
        dataKey="Discord"
        stroke="#6543ec"
        dot={false}
        strokeWidth={1}
      />
    </LineChart>
  );
};

export default CommunityChart;
