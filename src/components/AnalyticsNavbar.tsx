import Link from 'next/link'

const AnalyticsNavbar: any = () => {
  return (
    <div className="navbar">
      <Link href="/"><a>Home</a></Link>
      <Link href="/markets"><a>Markets</a></Link>
      <Link href="/uwp"><a>UWP</a></Link>
      <Link href="/xslocker"><a>xsLocker</a></Link>
      <Link href="/votePower"><a>Vote Power</a></Link>
      <Link href="/community"><a>Community</a></Link>
    </div>
  )
}

export default AnalyticsNavbar
