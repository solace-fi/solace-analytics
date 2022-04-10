import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AnalyticsHead from './../src/components/AnalyticsHead'
import AnalyticsNavbar from './../src/components/AnalyticsNavbar'
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const emptyDict: any = {}
  const [markets, setMarkets] = useState(emptyDict)
  const [uwp, setUwp] = useState(emptyDict)
  const [xslocker, setXslocker] = useState(emptyDict)

  useEffect(() => {

    fetch("https://stats.solace.fi/fs?f=markets/all.json")
    .then((data: any) => data.text())
    .then((data: any) => JSON.parse(data))
    .then((data: any) => setMarkets(data))

    fetch("https://stats.solace.fi/fs?f=uwp/all.json")
    .then((data: any) => data.text())
    .then((data: any) => JSON.parse(data))
    .then((data: any) => setUwp(data))

    fetch("https://stats.solace.fi/xsLocker/")
    .then((data: any) => data.text())
    .then((data: any) => JSON.parse(data))
    .then((data: any) => setXslocker(data))

  }, [])

  return (<>
    <AnalyticsHead/>
    <AnalyticsNavbar/>
    <Component {...pageProps} markets={markets} uwp={uwp} xslocker={xslocker} />
  </>)
}

export default MyApp
