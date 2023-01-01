import format from 'date-fns/format';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Collapse, Table } from 'react-daisyui';
import vs from '../../Assets/vs.png'

const matchDetails = ({ h2h, homeTeam, awayTeam, homePlayers, awayPlayers, homeCoach, awayCoach }) => {


    const date = format(new Date(), 'dd MMM yyyy')

    return (
        <div className='min-h-screen bg-sky-100 pt-20'>

            <div className='flex justify-center mx-96'>
                <Image src={homeTeam?.response[0]?.team?.logo} height={150} width={150} alt='' />
                <Image src={vs} height={200} width={200} alt='' />
                <Image src={awayTeam?.response[0]?.team.logo} height={150} width={150} alt='' />
            </div>

            <div className='flex justify-between mt-20'>

                <div className='overflow-x-auto'>
                    <Table>
                        <Table.Body>
                            {
                                homePlayers?.response?.slice(0, 6).map((player, i) =>
                                    <Table.Row key={player.player.id}>
                                        <Image className='rounded-full' src={player.player.photo} width={50} height={50} alt='' />
                                        <p>{player.player.name}</p>
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>

                    <Link className='text-sm ml-12 mt-8  text-white z-50 py-1 px-2 border-2 border-red-600 border-l-gray-800 rounded-full bg-red-600 hover:text-red-600 hover:bg-white hover:border-2 relative bottom-5' href='/matchDetails/[details]'>See all players</Link>
                </div>

                <div className='overflow-x-auto'>
                    <Table>
                        <Table.Body>
                            <Table.Row>
                                <Image className='rounded-full' src={homeCoach?.response[0]?.photo} width={75} height={75} alt='' />
                                <p>{homeCoach?.response[0].name}</p>
                                <span />
                                <p>{awayCoach?.response[0].name}</p>
                                <Image className='rounded-full' src={awayCoach?.response[0].photo} width={75} height={75} alt='' />
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>

                <div className='overflow-x-auto'>
                    <Table>
                        <Table.Body>
                            {
                                awayPlayers?.response?.map(player =>
                                    <Table.Row key={player.player.id}>
                                        <p>{player.player.name}</p>
                                        <Image className='rounded-full' src={player.player.photo} width={50} height={50} alt='' />
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                </div>
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
    let year = today.getFullYear();

    let month = today.getMonth();
    console.log(month);

    const h2hRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${context.params.details}`, options)
    const h2h = await h2hRes.json();

    const homeTeamRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${context.params.details.split("-").pop()}`, options)
    const homeTeam = await homeTeamRes.json();

    const awayTeamRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/teams?id=${context.params.details.split("-")[0]}`, options)
    const awayTeam = await awayTeamRes.json();

    const homePlayersRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${context.params.details.split("-").pop()}&season=${month <= 5 ? Number(year) - 1 : year}`, options)
    const homePlayers = await homePlayersRes.json();

    const awayPlayersRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${context.params.details.split('-')[0]}&season=${month <= 5 ? Number(year) - 1 : year}`, options)
    const awayPlayers = await awayPlayersRes.json();

    const homeCoachRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/coachs?team=${context.params.details.split('-').pop()}`, options)
    const homeCoach = await homeCoachRes.json();

    const awayCoachRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/coachs?team=${context.params.details.split('-')[0]}`, options)
    const awayCoach = await awayCoachRes.json();

    return {
        props: {
            h2h,
            homeTeam,
            awayTeam,
            homePlayers,
            awayPlayers,
            homeCoach,
            awayCoach
        }
    }
}

export default matchDetails;

