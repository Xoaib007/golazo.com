import add from 'date-fns/add';
import format from 'date-fns/format';
import Image from 'next/image';
import React from 'react';
import { Table } from 'react-daisyui';

const Matches = ({ matches, standing }) => {

    const tomorrowFns = add(new Date(),{
        days: 1
      })

      const tommorrowDate = format(tomorrowFns, 'yyyy-MM-dd')

    return (
        <div className='min-h-screen bg-sky-100 flex flex-col  items-center'>

            {/* matches */}
            <div className='grid grid-cols-1 pt-10 gap-10'>
                {
                    matches?.response.map((match, i) =>
                        <>
                            {
                                match.fixture.date.slice(0, 10) === tommorrowDate ?
                                    <div key={i} className='h-20 w-[640px] rounded-lg bg-white'>
                                        <div className='flex justify-between px-20 p-4'>
                                            <div className='flex w-1/2'>
                                                <Image src={match.teams.home.logo} width={50} height={50} alt='' />
                                                <p className='pt-3'>{match.teams.home.name}</p>
                                            </div>

                                            <div className='w-32 h-12'>
                                                <p className='text-center'>{match.fixture.date.slice(11, 16)}</p>
                                                <div className='flex'>
                                                    <input className='h-10 w-10 border-2 border-gray-300' />
                                                    <p className='mx-4'>-</p>
                                                    <input className='h-10 w-10 border-2 border-gray-300' />
                                                </div>
                                            </div>

                                            <div className='flex w-1/2 justify-end'>
                                                <p className='pt-3'>{match.teams.away.name}</p>
                                                <Image src={match.teams.away.logo} width={50} height={50} alt='' />
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                        </>
                    )
                }
            </div>

            {/* Standing table */}
            <div className=' pt-10'>
                <div className='overflow-x-auto'>
                    <Table className="rounded-box text-sm">
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
                                standing?.response[0]?.league?.standings[0]?.slice(0,5).map(team =>
                                    <Table.Row key={team.rank}>
                                        <div>{team.rank}</div>
                                        <div><Image src={team.team.logo}  width={25} height={25} alt='' /></div>
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

    const matchesRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${context.params.id}&season=${yyyy}`, options)
    const matches = await matchesRes.json();

    const standingRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/standings?season=${yyyy}&league=${context.params.id}`, options)
    const standing = await standingRes.json();

    return {
        props: {
            matches,
            standing
        }
    }
}

export default Matches;