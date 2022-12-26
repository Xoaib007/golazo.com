import React from 'react';

const singleCountry = ({leagues}) => {
    return (
        <div>
            {
                leagues?.response?.map((league, i)=>
                <p key={i}>{league.country.name}</p>
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

export const getStaticProps = async (context)=> {
  const res = await fetch ('https://api-football-v1.p.rapidapi.com/v3/leagues?country='+ context.params.country, options)
  const leagues = await res.json();

  return{
    props:{
      leagues
    }
  }
}

export default singleCountry;