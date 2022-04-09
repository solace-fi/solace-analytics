import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AnalyticsHead from './../src/components/AnalyticsHead'
import AnalyticsNavbar from './../src/components/AnalyticsNavbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (<>
    <AnalyticsHead/>
    <AnalyticsNavbar/>
    <Component {...pageProps} />
  </>)
}

export default MyApp
