import Image from 'next/image'
import { Inter } from '@next/font/google'
import Meta from '../components/meta'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ countries }) {
  return (
    <>
      <Meta />
      <div className='bg-cover1 min-h-screen pt-10'>
        Welcome home, brada
      </div>

    </>
  )
}
