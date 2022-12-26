import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Meta from '../../components/meta';
import SearchBar from '../../components/reusable/searchBar';

const singleCountry = ({ leagues }) => {
  return (
    <>
      <Meta />
      <div className=' w-fit mx-auto mb-20 '>
        <SearchBar placeholder={'Search for a league ...'} />
      </div>

      <div className='grid grid-cols-5 gap-10 mx-52 mb-20'>
        {
          leagues?.response?.map((league, i) =>
            <Link href='/league/[id]' as={`/league/${league.league.id}`} key={i} className='bg-gray-200 p-4 h-60 w-40 rounded-lg'>
              <div className='h-32'>
                {league.league.logo && <Image src={league.league.logo} alt="" height={100} width={100} className='mx-auto pt-8 ' />}
              </div>
              <div className='mt-2'>
                {
                  league.league.name.length >= 20?
                  <p className='text-center pt-8 font-semibold'>{league.league.name.slice(0,20)+ '...'}</p>
                  :
                  <p className='text-center pt-8 font-semibold'>{league.league.name}</p>
                }
              </div>
            </Link>
          )
        }
      </div>
    </>
  );
};

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'fa3c6269c2mshe9f544ced1685dcp1ef0d8jsn46c5b3c091cb',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};

export const getServerSideProps = async (context) => {
  const res = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?country=' + context.params.country, options)
  const leagues = await res.json();

  return {
    props: {
      leagues
    }
  }
}

export default singleCountry;