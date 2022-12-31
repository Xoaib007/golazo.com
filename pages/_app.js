import Main from '../Layout/Main'
import '../styles/globals.css'
import { Comfortaa } from '@next/font/google'

const font= Comfortaa({
  subsets:['latin'],
  weight:['400', '700']
})

export default function App({ Component, pageProps }) {
  return (
    <div className={font.className}>
    <Main>
      <Component {...pageProps} />
    </Main>
    </div>
  )
}
