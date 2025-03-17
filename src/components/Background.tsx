import Image from 'next/image'
import pink_bg from '@/images/bg/pink_bg.jpg'
 
export default function Background() {
  return (
    <Image
      alt="pink background image"
      src={pink_bg}
      placeholder="blur"
      quality={100}
      fill
      className='fixed w-screen overflow-hidden -z-50 opacity-35'
      priority
    />
  )
}
