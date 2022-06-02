import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
const BN = ethers.BigNumber;
const formatUnits = ethers.utils.formatUnits;

import Loading from "./../src/components/Loading";
import PoliciesChart from "./../src/components/charts/swc/PoliciesChart";
import PremiumsChart from "./../src/components/charts/swc/PremiumsChart";
import CoverLimitChart from "./../src/components/charts/swc/CoverLimitChart";
import { leftPad, formatNumber } from "./../src/helpers/index";
import SectionTitle from "@components/atoms/SectionTitle";

const Policies: NextPage = (props: any) => {
  if (!props || !props.swc || Object.keys(props.swc).length == 0)
    return <Loading />;
  const swc = toFloat(props.swc);
  return (
    <div className={styles.container}>
      <SectionTitle size="h3">SWC Policies</SectionTitle>
      <PoliciesChart swc={swc} />
      <br />
      <SectionTitle size="h3">SWC Premiums</SectionTitle>
      <PremiumsChart swc={swc} />
      <br />
      <SectionTitle size="h3">SWC Cover Limit</SectionTitle>
      <CoverLimitChart swc={swc} />
      <br />
      <SectionTitle size="h3">SWC Policies Ethereum</SectionTitle>
      <PolicyTable policies={swc.ethereum_v1.policies} />
      <br />
      <SectionTitle size="h3">SWC Policies Polygon</SectionTitle>
      <PolicyTable policies={swc.polygon_v2.policies} />
      <br />
      <SectionTitle size="h3">SWC Policies Fantom</SectionTitle>
      <PolicyTable policies={swc.fantom_v2.policies} />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Policies;

function toFloat(swc: any) {
  var swc2 = JSON.parse(JSON.stringify(swc));
  var keys = Object.keys(swc2);
  // transform to float
  for (var k of keys) {
    var history = swc2[k].history;
    for (var h of history) {
      for (var p of [
        "coverLimit",
        "depositsMade",
        "premiumsCharged",
        "rewardPointsEarned",
      ]) {
        if (h.hasOwnProperty(p)) {
          h[p] = formatUnits(h[p], 18);
        }
      }
    }
  }
  return swc2;
}

const PolicyTable: any = (props: any) => {
  var s = "policyID | policyholder                               | coverLimit |depositsMade| premiumsCharged | referralsEarned\n-------------------------------------------------------------------------------------------------------------------\n"
  var fn = formatNumber({ decimals: 0 })
  props.policies.forEach((policy: any) => {
    var policyID = leftPad(policy.policyID, 8, ' ')
    var coverLimit = leftPad(fn(formatUnits(policy.coverLimit, 18)), 10, ' ')
    var depositsMade = leftPad(fn(formatUnits(policy.depositsMade, 18)), 10, ' ')
    var premiumsCharged = leftPad(fn(formatUnits(policy.premiumsCharged, 18)), 15, ' ')
    var referralsEarned = leftPad(fn(formatUnits(policy.rewardPointsEarned, 18)), 15, ' ')
    s = `${s}${policyID} | ${policy.policyholder} | ${coverLimit} | ${depositsMade} | ${premiumsCharged} | ${referralsEarned}\n`
  });
  return <pre>{s}</pre>;
};
