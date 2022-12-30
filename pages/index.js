import { Inter } from '@next/font/google'
import Meta from '../components/meta'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ countries }) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  const todayDate =  yyyy + '-' + mm + '-' + dd ;

  return (
    // <>
    //   <Meta />
    //   <div className='bg-cover1 min-h-screen pt-10'>
    //     <p className='text-white text-5xl font-bold mt-[13%] ml-20'>Predict matches and <br />win <span className=''>amazing</span> gifts....</p>

    //     <Link href='/matches?date=[date]' as={`/matches?date=${todayDate}`} className="btn1 black">Watch more...</Link>
    //   </div>

    // </>
  )
}
