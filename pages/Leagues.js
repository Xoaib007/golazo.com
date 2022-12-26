import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Meta from '../components/meta';
import SearchBar from '../components/reusable/searchBar';

const Countries = ({ countries }) => {
    return (
        <>
            <Meta />

            <div className=' w-fit mx-auto mb-20'>
                <SearchBar placeholder={'Search for a country ...'} />
            </div>

            <div className='grid grid-cols-4 gap-40 mx-80 mb-60'>
                {
                    countries?.response?.map(country =>
                        <Link key={country.code} href='/country/[country]' as={`country/${country.name}`}>
                            <div className='w-40 h-16 bg-blue-200 rounded-lg py-4'>
                                {
                                    country.name.length > 11 ?
                                        <p className='text-center text-black mb-2 text-md font-semibold border-t-8 border-blue-700'>{country.name}</p>
                                    :
                                        <p className='text-center text-black mb-2 text-xl font-semibold border-t-8 border-blue-700'>{country.name}</p>
                                }

                                {
                                    country.flag && country.flag.name !== 'World' ?
                                        <Image src={country.flag} alt="" height={900} width={900} className='rounded-b-lg' />
                                    :
                                        <FontAwesomeIcon icon={faEarth} className='w-28 h-28 ml-5' />
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