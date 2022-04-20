import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Loading from "./../src/components/Loading";
import CommunityChart from "./../src/components/charts/CommunityChart";
import SectionTitle from "@components/atoms/SectionTitle";

const Community: NextPage = (props: any) => {
  if (!props || !props.community || Object.keys(props.community).length == 0)
    return <Loading />;
  const community = props.community;
  return (
    // <div className={styles.container}>
    <>
      <SectionTitle size="h3">Community</SectionTitle>
      <CommunityChart community={community} />
    </>
    // </div>
  );
};

export default Community;
