import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Meta from '../components/meta';
import SearchBar from '../components/reusable/searchBar';

const Countries = ({ countries }) => {
    return (
        <>
            <Meta />

            <div className=' w-fit mx-auto mb-20 '>
                <SearchBar placeholder={'Search for a country ...'} />
            </div>
            
            <div className='grid grid-cols-4 gap-32 mx-80'>
                {
                    countries?.response?.map(country =>
                        <Link key={country.code} href='/country/[country]' as={`country/${country.name}`}>
                            <div className='w-40 h-16 bg-gray-400 rounded-lg p-4'>
                                <p className='text-center text-black mb-2 text-xl font-semibold'>{country.name}</p>
                                {country.flag && <Image src={country.flag} alt="" height={900} width={900} className='rounded-b-lg' />}
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

export const getServerSideProps = async () => {
    const res = await fetch('https://api-football-v1.p.rapidapi.com/v3/countries', options)
    const countries = await res.json();

    return {
        props: {
            countries
        }
    }
}

export default Countries;