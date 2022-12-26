import Main from '../Layout/Main'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className='bg-[#F7F9FF]'>
    <Main>
      <Component {...pageProps} />
    </Main>
    </div>
  )
}
