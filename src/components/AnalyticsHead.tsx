import Head from "next/head";

const AnalyticsHead: any = () => {
  return (
    <Head>
      <title>Solace Analytics</title>
      <meta
        name="description"
        content="Analytics of the Solace Coverage Protocol"
      />
      <link rel="icon" href="/favicon.ico" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Open+Sans:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default AnalyticsHead;
