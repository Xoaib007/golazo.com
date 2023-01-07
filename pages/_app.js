import Main from '../Layout/Main'
import '../styles/globals.css'
import { Comfortaa } from '@next/font/google'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const font = Comfortaa({
  subsets: ['latin'],
  weight: ['400', '700']
})

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 5000);

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return loading && (<div className='spinner-wrapper'>
    <div className="spinner"></div></div>)
}

export default function App({ Component, pageProps }) {
  return (
    <div className={font.className}>
        <Loading/>
        <Main>
        
          <Component {...pageProps} />
        </Main>
    </div>
  )
}
