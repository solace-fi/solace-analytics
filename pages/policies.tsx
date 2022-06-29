import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
const BN = ethers.BigNumber;
const formatUnits = ethers.utils.formatUnits;

import Loading from "./../src/components/Loading";
import PoliciesChart from "./../src/components/charts/spi/PoliciesChart";
import PremiumsChart from "./../src/components/charts/spi/PremiumsChart";
import CoverLimitChart from "./../src/components/charts/spi/CoverLimitChart";
import { leftPad, formatNumber } from "./../src/helpers/index";
import SectionTitle from "@components/atoms/SectionTitle";

const Policies: NextPage = (props: any) => {
  if (!props || !props.spi || Object.keys(props.spi).length == 0)
    return <Loading />;
  const spi = toFloat(props.spi);
  return (
    <div className={styles.container}>
      <SectionTitle size="h3">SPI Policies</SectionTitle>
      <PoliciesChart spi={spi} />
      <br />
      <SectionTitle size="h3">SPI Premiums</SectionTitle>
      <PremiumsChart spi={spi} />
      <br />
      <SectionTitle size="h3">SPI Cover Limit</SectionTitle>
      <CoverLimitChart spi={spi} />
      <br />
      <SectionTitle size="h3">SPI Policies Ethereum</SectionTitle>
      <PolicyTable policies={spi.ethereum_v3.policies} />
      <br />
      <SectionTitle size="h3">SPI Policies Aurora</SectionTitle>
      <PolicyTable policies={spi.aurora_v3.policies} />
      <br />
      <SectionTitle size="h3">SPI Policies Polygon</SectionTitle>
      <PolicyTable policies={spi.polygon_v3.policies} />
      <br />
      <SectionTitle size="h3">SPI Policies Fantom</SectionTitle>
      <PolicyTable policies={spi.fantom_v3.policies} />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Policies;

function toFloat(spi: any) {
  var spi2 = JSON.parse(JSON.stringify(spi));
  var keys = Object.keys(spi2);
  // transform to float
  for (var k of keys) {
    var history = spi2[k].history;
    for (var h of history) {
      for (var p of [
        "coverLimit",
        "depositsMade",
        "premiumsCharged",
      ]) {
        if (h.hasOwnProperty(p)) {
          h[p] = formatUnits(h[p], 18);
        }
      }
    }
  }
  return spi2;
}

const PolicyTable: any = (props: any) => {
  var s = "policyID | policyholder                               | coverLimit |depositsMade| premiumsCharged\n-------------------------------------------------------------------------------------------------\n"
  var fn = formatNumber({ decimals: 0 })
  props.policies.forEach((policy: any) => {
    var policyID = leftPad(policy.policyID, 8, ' ')
    var coverLimit = leftPad(fn(formatUnits(policy.coverLimit, 18)), 10, ' ')
    var depositsMade = leftPad(fn(formatUnits(policy.depositsMade, 18)), 10, ' ')
    var premiumsCharged = leftPad(fn(formatUnits(policy.premiumsCharged, 18)), 15, ' ')
    s = `${s}${policyID} | ${policy.policyholder} | ${coverLimit} | ${depositsMade} | ${premiumsCharged}\n`
  });
  return <pre>{s}</pre>;
};
