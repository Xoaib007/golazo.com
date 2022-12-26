import React from 'react';

const singleLeague = ({league}) => {
    return (
        <div>
            <p className='text-5xl'>{league?.response[0]?.league?.name}</p>
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
    const res = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?id=' + context.params.id, options)
    const league = await res.json();
  
    return {
      props: {
        league
      }
    }
  }

export default singleLeague;