import Image from 'next/image'
import { Inter } from '@next/font/google'
import Meta from '../components/meta'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ countries }) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  const todayDate =  yyyy + '-' + mm + '-' + dd ;

  return (
    <>
      <Meta />
      <div className='bg-cover1 min-h-screen pt-10'>
        <p className='text-white text-5xl font-bold mt-[13%] ml-20'>Predict matches and <br />win <span className=''>amazing</span> gifts....</p>

        <Link href={`/matches?date=${todayDate}`} className="btn1 black">Watch more...</Link>


        {/* <button className='btn-primary bg-transparent border-2 rounded-none py-2 px-10 flex ml-20 mt-10'>
          <p className=' text-2xl font-semibold '>Read More</p>
          <FontAwesomeIcon icon={faArrowRight} className='w-5 h-5 mt-2 ml-2' />
        </button> */}
      </div>

    </>
  )
}
