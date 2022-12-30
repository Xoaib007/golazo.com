import Image from 'next/image';
import React from 'react';
import pl from '../Assets/PL.png'
import laliga from '../Assets/LA_LIGA.png'
import serieA from '../Assets/SERIE_A.png'
import bundesliga from '../Assets/bundesliga.png'
import ucl from '../Assets/CL.png'
import Link from 'next/link';

const SelectLeague = () => {
    const leagues = [
        {
            id: 39,
            title: 'English Premier League',
            logo: pl,
        },
        {
            id: 140,
            title: 'La liga',
            logo: laliga,
        },
        {
            id: 135,
            title: 'Serie A',
            logo: serieA,
        },
        {
            id: 78,
            title: 'Bundesliga',
            logo: bundesliga,
        },
        {
            id: 2,
            title: 'UEFA Champions League',
            logo: ucl,
        },
    ]

    return (
        <div className='min-h-screen bg-sky-100'>
            <p className='text-3xl w-fit text-gray-600 font-bold text-center pt-10 border-b-8 border-sky-700 mx-auto px-4 pb-4 '>Choose a league</p>
            <div className='grid grid-cols-5 mx-56 '>
                {
                    leagues.map(league =>
                        <Link key={league.id} as={`/match/${league.id}`} href='/match/[id]'>
                            <div className='flex flex-col items-center mt-20'>
                                <Image className='rounded-full shadow-xl' src={league.logo} width={140} height={140} alt='' />
                                <p className='text-xl font-semibold mt-3'>{league.title}</p>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};




export default SelectLeague;