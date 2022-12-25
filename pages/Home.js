import Image from 'next/image'
import { Inter } from '@next/font/google'
import Meta from '../components/meta'

const inter = Inter({ subsets: ['latin'] })

export default function Home({countries}) {
  return (
    <>
      <Meta/>
      <div>
        Welcome home, brada
      </div>
      
    </>
  )
}
