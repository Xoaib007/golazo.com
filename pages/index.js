import { Inter } from '@next/font/google'
import Meta from '../components/meta'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ countries }) {

  return (
    <>
      <Meta />
      <div className='bg-cover1 min-h-screen pt-10'>
        <p className='text-white text-5xl font-bold mt-[13%] ml-20'>Predict matches and <br />win <span className=''>amazing</span> gifts....</p>

        <Link href='/Contest' className="btn1 black">Watch more...</Link>
      </div>

    </>
  )
}
