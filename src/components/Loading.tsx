import Image from 'next/image'

const Loading: any = () => {
  return (
    <div>
      <img src="/spin.gif" width="100px" height="100px" alt="spinner"/>
      <p>Loading</p>
    </div>
  )
}

export default Loading
