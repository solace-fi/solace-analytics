import "../styles/globals.css";
import type { AppProps } from "next/app";
import AnalyticsHead from "@/components/AnalyticsHead";
import AnalyticsNavbar from "@/components/AnalyticsNavbar";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const emptyDict: any = {};
  const [data, setData] = useState(emptyDict);

  useEffect(() => {
    fetch("https://stats-cache.solace.fi/analytics-stats.json")
      .then((data: any) => data.text())
      .then((data: any) => JSON.parse(data))
      .then((data: any) => {
        setData(data);
      });
  }, []);

  return (
    <>
      <AnalyticsHead />
      <body className="p-5 bg-bg-dark font-body ml-25">
        <main className="bg-bg-dark min-h-screen text-light font-body">
          <AnalyticsNavbar />
          <Component {...pageProps} {...data} />
        </main>
      </body>
    </>
  );
}

export default MyApp;
