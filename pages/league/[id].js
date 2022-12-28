import Image from 'next/image';
import React, { useState } from 'react';
import { Select, Table } from 'react-daisyui';

const singleLeague = ({ league, match, standing, topScorers, seasons }) => {
    const [selectedSeason, setSeason] = useState('default');

    return (
        <div className='min-h-screen mx-20 mt-20'>
            <div className='flex justify-between'>
                <div className='flex'>
                    <Image src={league.response[0].league.logo} width={120} height={120} alt='' />
                    <div className='mt-5 ml-10'>
                        <p className=' text-6xl font-semibold mb-5'>{league?.response[0]?.league?.name}</p>
                        <p className='text-2xl'>Current season: {league?.response[0]?.seasons.slice(-1)[0]?.year}-{Number(league?.response[0]?.seasons.slice(-1)[0]?.year) + 1}</p>
                    </div>
                </div>

                <div className="flex component-preview p-4 items-center justify-center gap-2 font-sans">
                    <Select
                        value={selectedSeason}
                        onChange={setSeason}
                    >
                        <option value={'default'} disabled>
                            {league?.response[0]?.seasons.slice(-1)[0]?.year}-{Number(league?.response[0]?.seasons.slice(-1)[0]?.year) + 1}
                        </option>
                        {
                            seasons?.response?.map(season=>
                                <option value={season} key={season}>{season} - {Number(season+1)}</option>
                            )
                        }
                        
                    </Select>
                </div>
            </div>

            <div className='mt-20 flex'>

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
                                            <div className='flex justify-between px-10 p-4 border-b-2 border-gray-700'>
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
                                                    <p className='ml-2'>{match.fixture.date.slice(0, 10)}</p>
                                                    <p className='ml-8'>{match.fixture.date.slice(11, 16)}</p>
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

                <div>
                    {/* Standings Section */}
                    <div className='ml-10'>
                        <div className='h-16 w-full bg-[#243F85]'>
                            <p className='text-white text-3xl ml-[40%] font-semibold pt-4'>Standings</p>
                        </div>
                        <div className='overflow-x-auto'>
                            <Table className="rounded-box">
                                <Table.Head>
                                    <span />
                                    <span />
                                    <span>Team</span>
                                    <span>pts.</span>
                                    <span>G</span>
                                    <span>W</span>
                                    <span>L</span>
                                    <span>D</span>
                                    <span>GS</span>
                                    <span>GC</span>
                                    <span>GD</span>
                                    <span>Form</span>
                                    <span />
                                </Table.Head>

                                <Table.Body>
                                    {
                                        standing?.response[0]?.league?.standings[0]?.map(team =>
                                            <Table.Row key={team.rank}>
                                                <div>{team.rank}</div>
                                                <div><Image src={team.team.logo} width={280} height={280} alt='' /></div>
                                                <div>{team.team.name}</div>
                                                <div>{team.points}</div>
                                                <div>{team.all.played}</div>
                                                <div>{team.all.win}</div>
                                                <div>{team.all.lose}</div>
                                                <div>{team.all.draw}</div>
                                                <div>{team.all.goals.for}</div>
                                                <div>{team.all.goals.against}</div>
                                                <div>{team.goalsDiff}</div>
                                                <div>{team.form}</div>
                                                <div></div>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>

                    {/* Top Scorer */}
                    <div className='ml-10 mt-20'>
                        <div className='h-16 w-full bg-[#243F85]'>
                            <p className='text-white text-3xl ml-[40%] font-semibold pt-4'>Top Scorers</p>
                        </div>
                        <div className='overflow-x-auto'>
                            <Table className="rounded-box">
                                <Table.Head>
                                    <span />
                                    <span />
                                    <span>Name</span>
                                    <span>Age</span>
                                    <span>Country</span>
                                    <span>Team</span>
                                    <span>Played</span>
                                    <span>Goals</span>
                                    <span>Assists</span>
                                    <span />
                                </Table.Head>

                                <Table.Body>
                                    {
                                        topScorers?.response?.map((topScorer, i) =>
                                            <Table.Row key={topScorer.player.id}>
                                                <div>{i}</div>
                                                <div><Image src={topScorer.player.photo} width={70} height={70} alt='' /></div>
                                                <div>{topScorer.player.name}</div>
                                                <div>{topScorer.player.age}</div>
                                                <div>{topScorer.player.nationality}</div>
                                                <div><Image src={topScorer.statistics[0].team.logo} width={50} height={50} alt='' /></div>
                                                <div>{topScorer.statistics[0].games.appearences}</div>
                                                <div>{topScorer.statistics[0].goals.total}</div>
                                                <div>{topScorer.statistics[0].goals.assists}</div>
                                                <div></div>
                                            </Table.Row>
                                        )
                                    }
                                </Table.Body>
                            </Table>
                        </div>
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

export const getServerSideProps = async (context) => {
    const leagueRes = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues?id=' + context.params.id, options)
    const league = await leagueRes.json();

    const matchRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${context.params.id}&season=2022`, options)
    const match = await matchRes.json();

    const standingRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=${context.params.id}`, options)
    const standing = await standingRes.json();

    const topScorersRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${context.params.id}&season=2022`, options)
    const topScorers = await topScorersRes.json();
    
    const seasonsRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues/seasons`, options)
    const seasons = await seasonsRes.json();

    return {
        props: {
            league,
            match,
            standing,
            topScorers,
            seasons
        }
    }
}

export default singleLeague;