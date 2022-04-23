import { leftPad, rightPad, tooltipFormatterNumber, tooltipLabelFormatterTime } from "@helpers";

export function CustomTooltip(props: any) {
  let { active, payload, label, valuePrefix, valueDecimals } = props
  if (!active || !payload || !payload.length) return null
  // precalculate text of each line
  let maxLengthName = 0
  let maxLengthValue = 0
  let formatter = tooltipFormatterNumber({ decimals: valueDecimals, prefix: valuePrefix })
  for(var i = 0; i < payload.length; ++i) {
    payload[i].nameText = payload[i].name;
    if(payload[i].nameText.length > maxLengthName) maxLengthName = payload[i].nameText.length;
    payload[i].valueText = formatter(payload[i].value)
    if(payload[i].valueText.length > maxLengthValue) maxLengthValue = payload[i].valueText.length;
  }
  for(var i = 0; i < payload.length; ++i) {
    payload[i].rowText = `${rightPad(payload[i].nameText, maxLengthName)}  ${leftPad(payload[i].valueText, maxLengthValue)}`
  }

  return (
    <div className="custom-tooltip">
      <pre className="custom-tooltip-label">
        {tooltipLabelFormatterTime(label)}
      </pre>
      <ul className="custom-tooltip-item-list">
        {payload.map((item:any, key:any) => {
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
