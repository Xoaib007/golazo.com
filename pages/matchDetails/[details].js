import format from 'date-fns/format';
import Image from 'next/image';
import React from 'react';
import vs from '../../Assets/vs.png'

const matchDetails = ({ match }) => {


    const date = format(new Date(), 'dd MMM yyyy')

    return (
        <div className='min-h-screen bg-sky-100 pt-20'>

            <div className='flex justify-center mx-96'>
                <Image src={match?.response[0]?.teams?.home?.logo} height={150} width={150} alt='' />
                <Image src={vs} height={200} width={200} alt='' />
                <Image src={match.response[0]?.teams.away.logo} height={150} width={150} alt='' />
            </div>

            <div>
                {
                    match.response[0]?.players[0]?.players.map(player =>
                        <div key={player.player.id} className='flex items-center'>
                            <Image src={player.player.photo} width={100} height={100} alt=''/>
                            <p>{player.player.name}</p>
                        </div>
                    )
                }
            </div>

            <div className='bg-sky-200 rounded-lg w-fit px-6 py-3'>
                <p>Date: {date}</p>
                <p>Time: {match.response[0].fixture.date.slice(11, 16)}</p>
                <p>Venue: {match.response[0].fixture.venue.name}, {match.response[0].fixture.venue.city}</p>
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

    const matchRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${context.params.details}`, options)
    const match = await matchRes.json();

    return {
        props: {
            match
        }
    }
}

export default matchDetails;