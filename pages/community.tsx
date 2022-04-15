import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import Loading from "./../src/components/Loading"
import CommunityChart from "./../src/components/charts/CommunityChart"

const Community: NextPage = (props: any) => {
  if(!props || !props.community || Object.keys(props.community).length == 0) return <Loading/>
  const community = props.community
  return (
    <div className={styles.container}>
      <h3>Community</h3>
      <CommunityChart community={community}/>
      <br/><br/><br/><br/>
    </div>
  )
}

export default Community
