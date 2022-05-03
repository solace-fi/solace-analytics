import { leftPad, rightPad, tooltipFormatterNumber, tooltipLabelFormatterTime } from "@helpers";

export function CustomTooltip(props: any) {
  let { active, payload, label, valuePrefix, valueDecimals, chartType } = props
  if (!active || !payload || !payload.length) return null
  // reverse order of stacked line charts
  let payload2 = JSON.parse(JSON.stringify(payload))
  if(chartType && chartType == "stackedLine") payload2.reverse()
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
    <div className="custom-tooltip">
      <pre className="custom-tooltip-label">
        {tooltipLabelFormatterTime(label)}
      </pre>
      <ul className="custom-tooltip-item-list">
        {payload2.map((item:any, key:any) => {
          return (
            <li key={key} className="custom-tooltip-item">
              <div className="custom-tooltip-item-wrapper">
                <div className="custom-tooltip-item-color-wrapper">
                  <div className="custom-tooltip-item-color" style={{backgroundColor:item.color}}></div>
                </div>
                <pre className="custom-tooltip-item-text">{item.rowText}</pre>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
};
