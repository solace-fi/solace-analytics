import type { NextPage } from "next";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import Loading from "./../src/components/Loading";
import VotePowerByAccountChart from "./../src/components/charts/votePower/VotePowerByAccountChart";
import VotePowerOverTimeChart from "./../src/components/charts/votePower/VotePowerOverTimeChart";
import SectionTitle from "@components/atoms/SectionTitle";

const VotePower: NextPage = (props: any) => {
  if (!props || !props.xslocker || Object.keys(props.xslocker).length == 0)
    return <Loading />;
  const xslocker = props.xslocker;
  return (
    <>
      <SectionTitle size="h3">Vote Power By Account</SectionTitle>
      <VotePowerByAccountChart xslocker={xslocker} />
      <SectionTitle size="h3">Vote Power Over Time</SectionTitle>
      <VotePowerOverTimeChart xslocker={xslocker} />
    </>
  );
};

export default VotePower;
