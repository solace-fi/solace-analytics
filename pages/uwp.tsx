import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Loading from "./../src/components/Loading";
import UwpAllChart from "./../src/components/charts/uwp/UwpAllChart";
import UwpMainnetChart from "./../src/components/charts/uwp/UwpMainnetChart";
import UwpAuroraChart from "./../src/components/charts/uwp/UwpAuroraChart";
import UwpPolygonChart from "./../src/components/charts/uwp/UwpPolygonChart";
import SectionTitle from "@components/atoms/SectionTitle";

const Uwp: NextPage = (props: any) => {
  if (!props || !props.uwp || Object.keys(props.uwp).length == 0)
    return <Loading />;
  const uwp = props.uwp;
  return (
    <div className={styles.container}>
      <SectionTitle size="h4">Underwriting Pool</SectionTitle>
      <UwpAllChart uwp={uwp} />
      <br />
      <SectionTitle size="h4">Mainnet</SectionTitle>
      <UwpMainnetChart csv={uwp["1"]} />
      <br />
      <SectionTitle size="h4">Aurora</SectionTitle>
      <UwpAuroraChart csv={uwp["1313161554"]} />
      <br />
      <SectionTitle size="h4">Polygon</SectionTitle>
      <UwpPolygonChart csv={uwp["137"]} />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Uwp;
