import format from 'date-fns/format';
import Image from 'next/image';
import React from 'react';
import vs from '../../Assets/vs.png'

const matchDetails = ({ h2h,homePlayers }) => {


    const date = format(new Date(), 'dd MMM yyyy')

    return (
        <div className='min-h-screen bg-sky-100 pt-20'>

            <div className='flex justify-center mx-96'>
                <Image src={h2h?.response[0]?.teams?.home?.logo} height={150} width={150} alt='' />
                <Image src={vs} height={200} width={200} alt='' />
                <Image src={h2h.response[0]?.teams.away.logo} height={150} width={150} alt='' />
            </div>

            <div>
                <p>Match Played: {h2h.response.length}</p>
                <p>Home: {h2h.res}</p>
            </div>

            <div>
                {
                    
                }
            </div>

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

    let today = new Date();
    let yyyy = today.getFullYear();

    const h2hRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${context.params.details}`, options)
    const h2h = await h2hRes.json();

    const homePlayersRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${context.params.details.slice(0,1)}&season=${yyyy}`, options)
    const homePlayers = await homePlayersRes.json();

    return {
        props: {
            h2h,
            homePlayers
        }
    }
}

export default matchDetails;

