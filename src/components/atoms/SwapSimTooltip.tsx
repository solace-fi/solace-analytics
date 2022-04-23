import { leftPad, rightPad, tooltipFormatterNumber } from "@helpers";

export function SwapSimTooltip(props: any) {
  let { active, payload, label, labelPrefix, labelDecimals, valuePrefix, valueDecimals } = props
  if (!active || !payload || !payload.length) return null;
  // modify payload to include label as row
  let payload2: any = [{name: labelPrefix, value: label}];
  for(var i = 0; i < payload.length; ++i) {
    payload2.push(payload[i]);
  }
  // precalculate text of each line
  let maxLengthName = 0
  let maxLengthValue = 0
  let formatter = tooltipFormatterNumber({ decimals: valueDecimals, prefix: valuePrefix })
  for(var i = 0; i < payload2.length; ++i) {
    payload2[i].nameText = payload2[i].name;
    if(payload2[i].nameText.length > maxLengthName) maxLengthName = payload2[i].nameText.length;
    payload2[i].valueText = formatter(payload2[i].value)
    if(payload2[i].valueText.length > maxLengthValue) maxLengthValue = payload2[i].valueText.length;
  }
  for(var i = 0; i < payload2.length; ++i) {
    payload2[i].rowText = `${rightPad(payload2[i].nameText, maxLengthName)}  ${leftPad(payload2[i].valueText, maxLengthValue)}`
  }

  return (
    <div className="swapsim-tooltip">
      <ul className="swapsim-tooltip-item-list">
        {payload2.map((item:any, key:any) => {
          return (
            <li key={key} className="swapsim-tooltip-item">
              <div className="swapsim-tooltip-item-wrapper">
                <pre className="swapsim-tooltip-item-text">{item.rowText}</pre>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
};
