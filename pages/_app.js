import Main from '../Layout/Main'
import '../styles/globals.css'
import {Montserrat} from '@next/font/google'

const font= Montserrat({
  subsets:['latin'],
  weight:['400', '700']
})

export default function App({ Component, pageProps }) {
  return (
    <div className='bg-[#F7F9FF] '>
    <Main className={font.className}>
      <Component {...pageProps} />
    </Main>
    </div>
  )
}
