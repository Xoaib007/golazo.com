import Image from 'next/image';
import React from 'react';

const singleCountry = ({ leagues }) => {
  return (
    <div className='grid grid-cols-5 gap-10'>
      {
        leagues?.response?.map((league, i) =>
          <div key={i}>
            {league.league.logo && <Image  src={`${league.league.logo}`} alt="" height={900} width={900} />}
            <p>{league.league.name}</p>
          </div>
        )
      }
    </div>
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