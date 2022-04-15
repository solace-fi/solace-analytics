import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AnalyticsHead from './../src/components/AnalyticsHead'
import AnalyticsNavbar from './../src/components/AnalyticsNavbar'
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const emptyDict: any = {}
  const [data, setData] = useState(emptyDict)

  useEffect(() => {
    fetch("https://stats.solace.fi/analytics/")
    .then((data: any) => data.text())
    .then((data: any) => JSON.parse(data))
    .then((data: any) => {
      setData(data)
    })

  }, [])

  return (<>
    <AnalyticsHead/>
    <AnalyticsNavbar/>
    <Component {...pageProps} {...data}/>
  </>)
}

export default MyApp
