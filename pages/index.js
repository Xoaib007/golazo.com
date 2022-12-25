import Image from 'next/image'
import { Inter } from '@next/font/google'
import Meta from '../components/meta'

const inter = Inter({ subsets: ['latin'] })

export default function Home({countries}) {
  return (
    <>
      <Meta/>
      <div className='grid grid-cols-5 gap-40'>
        {
        countries?.response?.map(country=>
          <div className='w-40 h-10 ' key={country.code}>
            { country.flag && <Image src={country.flag} alt="" height={900} width={900} layout="responsive" /> }
            <p>{country.name}</p>
          </div>
        )
      }
      </div>
      
    </>
  )
}

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'fa3c6269c2mshe9f544ced1685dcp1ef0d8jsn46c5b3c091cb',
		'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
	}
};

export const getServerSideProps = async ()=>{
  const res = await fetch ('https://api-football-v1.p.rapidapi.com/v3/countries',options)
  const countries = await res.json();

  return{
    props:{
      countries
    }
  }
}

// host: api-football-v1.p.rapidapi.com