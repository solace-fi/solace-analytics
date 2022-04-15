import { ethers } from "ethers"
const BN = ethers.BigNumber
const formatUnits = ethers.utils.formatUnits

/*
export function formatCurrency(n: string | number): string{
  return n !== 0
    ? `$${parseFloat(n+"").toLocaleString()}`
    : "0"
}
*/

export function formatCurrency(params: any) {
  function f(n: any) {
    if(typeof n == "number") n = `${n}`
    var str = `\$${parseInt(n).toLocaleString()}`
    if(!params || !params.decimals || params.decimals <= 0) return str
    var i = n.indexOf(".")
    if(i == -1) return str
    var str2 = n.substring(i+1)
    str2 = rightPad(str2.substring(0,params.decimals), params.decimals, '0')
    str = `${str}.${str2}`
    return str
  }
  return f
}

/*
export function formatNumber(n: string | number): string{
  return n !== 0
    ? `${parseFloat(n+"").toLocaleString()}`
    : "0"
}
*/
export function formatNumber(params: any) {
  function f(n: string) {
    if(typeof n == "number") n = `${n}`
    var str = `${parseInt(n).toLocaleString()}`
    if(!params || !params.decimals || params.decimals <= 0) return str
    var i = n.indexOf(".")
    if(i == -1) return str
    var str2 = n.substring(i+1)
    str2 = rightPad(str2.substring(0,params.decimals), params.decimals, '0')
    str = `${str}.${str2}`
    return str
  }
  return f
}

export function formatBigNumber(params: any) {
  function f(n: string) {
    var n2 = BN.from(n.toLocaleString().replace(/,/g,''))
    var inputDecimals = 0
    if(params && params.inputDecimals && params.inputDecimals > 0) inputDecimals = params.inputDecimals
    var str1 = formatUnits(n2, inputDecimals)
    var str2 = `${parseInt(str1).toLocaleString()}`
    if(!params || !params.outputDecimals || params.outputDecimals <= 0) return str2
    var i = n.indexOf(".")
    if(i == -1) return str2
    var str3 = n.substring(i+1)
    str3 = rightPad(str2.substring(0,params.decimals), params.decimals, '0')
    var str4 = `${str2}.${str3}`
    return str4
  }
  return f
}

/*
export function tooltipFormatterCurrency(value:any, name:any, props:any) {
  return formatCurrency(value)
}
*/

export function tooltipFormatterCurrency(params:any) {
  var f2 = formatCurrency(params)
  function f(value:any, name:any, props:any) {
    return f2(value)
  }
  return f
}

/*
export function tooltipFormatterNumber(value:any, name:any, props:any) {
  return formatNumber()(value)
}
*/
export function tooltipFormatterNumber(params:any) {
  var f2 = formatNumber(params)
  function f(value:any, name:any, props:any) {
    return f2(value)
  }
  return f
}

export function tooltipFormatterBigNumber(params:any) {
  var f2 = formatBigNumber(params)
  function f(value:any, name:any, props:any) {
    return f2(value)
  }
  return f
}

export function tooltipLabelFormatterTime(value:any) {
  return formatTimestamp(value)
}

// formats a unix timestamp (in seconds) to UTC string representation
// mm:dd:yyyy hh:mm:ss
export function formatTimestamp(timestamp:number) {
  let d = new Date(timestamp * 1000)
  return `${d.getUTCMonth()+1}/${d.getUTCDate()}/${d.getUTCFullYear()} ${leftPad(d.getUTCHours(),2,'0')}:${leftPad(d.getUTCMinutes(),2,'0')}:${leftPad(d.getUTCSeconds(),2,'0')}`
}

export function leftPad(s:any, l:number, f:string) {
  let s2 = `${s}`
  while(s2.length < l) s2 = `${f}${s2}`
  return s2
}

export function rightPad(s:any, l:number, f:string) {
  let s2 = `${s}`
  while(s2.length < l) s2 = `${s2}${f}`
  return s2
}

// note: only supports positive step
export function range(start: number, stop: number, step: number) {
  let arr = []
  for(let i = start; i < stop; i += step) arr.push(i)
  return arr
}

// note: only supports positive step
export function rangeBN(start: any, stop: any, step: any) {
  let arr = []
  for(let i = start; i.lt(stop); i = i.add(step)) arr.push(i)
  return arr
}

export function sortBNs(a:any, b:any) {
  if(a.lt(b)) return -1;
  if(a.gt(b)) return 1;
  return 0;
}

// calculate x ticks. include start and stop times and midnight utc before every sunday
export function calculateWeeklyTicks(start:number, stop:number) {
  let one_week = 60*60*24*7
  let three_days = 60*60*24*3
  let rstop = stop
  let rstart = Math.ceil((start)/one_week)*one_week + three_days
  let xticks = range(rstart, rstop, one_week)
  xticks.push(start)
  xticks.push(stop)
  xticks = Array.from(new Set(xticks)).sort()
  return xticks
}

// calculate x ticks. include start and stop times and midnight utc before every sunday
export function calculateYearlyTicks(start:number, stop:number) {
  var xticks = [start, stop]
  var startYear = new Date(start*1000).getUTCFullYear()
  var stopYear = new Date(stop*1000).getUTCFullYear()
  var d = new Date(0)
  for(var year = startYear+1; year <= stopYear; ++year) {
    d.setUTCFullYear(year)
    xticks.push(d.getTime()/1000)
  }
  xticks = Array.from(new Set(xticks)).sort()
  return xticks
}

export function xtickLabelFormatter(str:any) {
  var d = new Date(str * 1000)
  var monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var month = monthMap[d.getUTCMonth()]
  var day = leftPad(d.getUTCDate(), 2, '0')
  var res = `${month} ${day}`
  return res
}

export function xtickLabelFormatterWithYear(str:any) {
  var d = new Date(str * 1000)
  var monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  var month = monthMap[d.getUTCMonth()]
  var day = leftPad(d.getUTCDate(), 2, '0')
  var year = d.getUTCFullYear()
  var res = `${month} ${day} ${year}`
  return res
}
