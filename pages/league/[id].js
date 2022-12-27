import Image from 'next/image';
import React from 'react';

const singleLeague = ({ league, match }) => {
    return (
        <div className='min-h-screen mx-20 mt-20'>
            <div className='flex'>
                <Image src={league.response[0].league.logo} width={120} height={120} alt='' />
                <div className='mt-5 ml-10'>
                    <p className=' text-6xl font-semibold mb-5'>{league?.response[0]?.league?.name}</p>
                    <p className='text-2xl'>Current season: {league?.response[0]?.seasons.slice(-1)[0]?.year}-{Number(league?.response[0]?.seasons.slice(-1)[0]?.year) + 1}</p>
                </div>
            </div>

            <div className='mt-20'>

                {/* Matches section */}
                <div className='w-1/2 rounded-lg bg-white'>
                    <div className='h-16 w-full bg-[#243F85]'>
                        <p className='text-white text-3xl ml-[40%] font-semibold pt-4'>Fixture</p>
                    </div>
                    <div>
                        {
                            match?.response?.map(match =>
                                <div key={match.fixture.id}>
                                    {
                                        match.fixture.status.short === 'FT' ?
                                            <div className='flex justify-between px-20 p-4 border-b-2 border-gray-700'>
                                                <div className='flex w-1/2'>
                                                    <Image src={match.teams.home.logo} width={50} height={50} alt='' />
                                                    <p className='pt-3'>{match.teams.home.name}</p>
                                                </div>

                                                <div className='flex'>
                                                    <div className='w-10 h-10 bg-gray-200'>
                                                        <p className='mx-4 mt-1 font-semibold text-xl'>{match.goals.home}</p>
                                                    </div>

                                                    <p className='mt-1 mx-4'>-</p>

                                                    <div className='w-10 h-10 bg-gray-200'>
                                                        <p className='mt-1 mx-4 font-semibold text-xl'>{match.goals.away}</p>
                                                    </div>
                                                </div>

                                                <div className='flex w-1/2 justify-end'>
                                                    <p className='pt-3'>{match.teams.away.name}</p>
                                                    <Image src={match.teams.away.logo} width={50} height={50} alt='' />
                                                </div>
                                            </div>
                                            :
                                            <div className='flex justify-between px-20 p-4 border-b-2 border-gray-700'>
                                                <div className='flex w-1/2'>
                                                    <Image src={match.teams.home.logo} width={50} height={50} alt='' />
                                                    <p className='pt-3'>{match.teams.home.name}</p>
                                                </div>

                                                <div className='w-32 h-12 bg-gray-200'>
                                                    <p className='ml-2'>{match.fixture.date.slice(0,10)}</p>
                                                    <p className='ml-8'>{match.fixture.date.slice(11,16)}</p>
                                                </div>

                                                <div className='flex w-1/2 justify-end'>
                                                    <p className='pt-3'>{match.teams.away.name}</p>
                                                    <Image src={match.teams.away.logo} width={50} height={50} alt='' />
                                                </div>
                                            </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className=''>

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

// https://api-football-v1.p.rapidapi.com/v3/standings?season=2020&league=39

export const getServerSideProps = async (context) => {
    const leagueRes = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?id=' + context.params.id, options)
    const league = await leagueRes.json();

    const matchRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${context.params.id}&season=2022`, options)
    const match = await matchRes.json();

    return {
        props: {
            league,
            match
        }
    }
}

export default singleLeague;