import Head from "next/head";

const AnalyticsHead: any = () => {
  return (
    <Head>
      {/* Main */}
      <title>Solace Analytics</title>
      <meta
        name="description"
        content="Analytics of the Solace Coverage Protocol"
      />
      <link rel="icon" href="/favicon.ico" />

      {/* Fonts */}
      <style data-href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@300;400;600;700&display=swap" />

      {/* Meta */}
      <meta httpEquiv="Content-Type" content="text/html;"/>
      <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0"/>
      <meta charSet="utf-8"/>
      <meta name="keywords" content="Ethereum, Solace, DeFi, Stablecoin, Protocol, Decentralized, Finance, Uniswap, Yearn, Aave, Compound, Curve, Sushiswap, Coverage, Crypto, Solace Finance, Solace Protocol"/>

      {/* Open Graph */}
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://analytics.solace.fi/"/>
      <meta property="og:title" content="Solace Analytics"/>
      <meta property="og:description" content="Analytics of the Solace Coverage Protocol"/>
      <meta property="og:image" content="/images/sharing.png"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
    </Head>
  );
};

export default AnalyticsHead;
