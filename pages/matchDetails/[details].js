import format from 'date-fns/format';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button, Collapse, Divider, Modal, Table } from 'react-daisyui';
import vs from '../../Assets/vs.png'

const matchDetails = ({ h2h, homeTeam, awayTeam, homePlayers, awayPlayers, homeCoach, awayCoach }) => {


    const date = format(new Date(), 'dd MMM yyyy');

    return (
        <div className='min-h-screen bg-sky-100 py-20'>

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

                    <Button className='text-sm mx-20 text-white z-50 py-1 px-2 border-2 border-red-600 border-l-gray-800 rounded-full bg-red-600 hover:text-red-600 hover:bg-white hover:border-2 relative bottom-3' href='/matchDetails/[details]'>See all players</Button>
                </div>

                <div className='overflow-x-auto'>
                    <div className='flex justify-center'>
                        <Table>
                            <Table.Body>
                                <Table.Row>
                                    <Image className='rounded-full' src={homeCoach?.response[0]?.photo} width={75} height={75} alt='' />
                                    <p>{homeCoach?.response[0].name}</p>
                                    <span className='text-2xl'>I</span>
                                    <p>{awayCoach?.response[0].name}</p>
                                    <Image className='rounded-full' src={awayCoach?.response[0]?.photo} width={75} height={75} alt='' />
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </div>

                    <div>
                        <p className='text-3xl border-b-4 border-gray-500 mt-32'>History</p>
                        {
                            h2h?.response?.map(match =>
                                <div className='px-20 pt-3 mt-10 h-32 w-[640px] rounded-xl bg-white mb-10 mx-5' key={match.fixture.id}>

                                    <div className='w-fit text-center mx-auto'>
                                        <p>{match.league.name}</p>
                                        <p>{match.fixture.date.slice(0, 10)}</p>
                                    </div>

                                    <div className='flex justify-between items-center'>
                                        <div className='flex w-1/2'>
                                            <Image src={match.teams.home.logo} width={50} height={50} alt='' />
                                            <p className={match.teams.home.name.length > 9 ? 'text-sm pt-5' : 'pt-3'}>{match.teams.home.name}</p>
                                        </div>

                                        <div className=''>
                                            <form className='flex'>
                                                <div className='h-12 w-8 border-2 bg-white border-gray-300  rounded-lg flex justify-center items-center text-2xl font-bold'>
                                                    <p>{match.goals.home}</p>
                                                </div>
                                                <p className='mx-2 mt-2'>-</p>
                                                <div className='h-12 w-8 border-2 bg-white border-gray-300 rounded-lg flex justify-center items-center text-2xl font-bold'>
                                                    <p>{match.goals.away}</p>
                                                </div>
                                            </form>
                                        </div>

                                        <div className='flex w-1/2 justify-end'>
                                            <p className={match.teams.away.name.length > 9 ? 'text-sm pt-5 pr-2' : 'pt-3 pr-2'}>{match.teams.away.name}</p>
                                            <Image src={match.teams.away.logo} width={50} height={50} alt='' />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <Table>
                        <Table.Body>
                            {
                                awayPlayers?.response?.slice(0, 6).map(player =>
                                    <Table.Row key={player.player.id}>
                                        <p>{player.player.name}</p>
                                        <Image className='rounded-full' src={player.player.photo} width={50} height={50} alt='' />
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>

                    <Link className='text-sm mx-20 text-white z-50 py-1 px-2 border-2 border-red-600 border-l-gray-800 rounded-full bg-red-600 hover:text-red-600 hover:bg-white hover:border-2 relative bottom-3' href='/matchDetails/[details]'>See all players</Link>
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

