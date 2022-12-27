import Image from 'next/image';
import React from 'react';

const singleLeague = ({ league }) => {
    return (
        <div className='min-h-screen mx-20 mt-20'>
            <div className='flex'>
                <Image src={league.response[0].league.logo} width={120} height={120} alt='' />
                <div className='mt-5 ml-10'>
                <p className=' text-6xl font-semibold mb-5'>{league?.response[0]?.league?.name}</p>
                <p className='text-2xl'>Current season: {league?.response[0]?.seasons.slice(-1)[0]?.year}-{Number(league?.response[0]?.seasons.slice(-1)[0]?.year)+1}</p>
                </div>
            </div>

            {/* Matches section */}
            <div>
                
            </div>
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