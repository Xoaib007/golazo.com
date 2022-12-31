import format from 'date-fns/format';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Table } from 'react-daisyui';

const Matches = ({ matches, standing, league }) => {

    const todayDate = format(new Date(), 'yyyy-MM-dd');
    const todayTime = format(new Date(), 'HH:mm');
    const formatedDate = format(new Date(), 'dd MMM yyyy')

    return (
        <div className='min-h-screen bg-sky-100 flex flex-col  items-center'>

            <div className='leaguebg w-full h-96 flex items-end pb-20 pl-20'>
                {league?.response[0]?.country.flag && <Image className='mb-8' src={league?.response[0]?.country.flag} width={75} height={50} alt='' />}
                <p className='text-5xl text-white font-bold ml-5'>{league?.response[0]?.league?.name} <br /> <span className='text-2xl'>{formatedDate}</span></p>
            </div>

            <div className='flex'>
                {/* matches */}
                <div className='mt-10 min-w-max mb-20 rounded-xl bg-sky-200'>
                    <div className='bg-[#243F85] rounded-t-xl w-full px-20 py-5 mb-5 h-20'>
                        <p className='text-3xl text-center font-bold text-white'>Matches</p>
                    </div>
                    {
                        matches?.response.map((match) =>
                            <>
                                {
                                    match.fixture.date.slice(0, 10) === todayDate && match.fixture.date.slice(11, 16) >= todayTime &&

                                        <Link href='/matchDetails/[details]' as={`/matchDetails/${match.fixture.id}`} key={match.fixture.id}>
                                            <div className='flex justify-between px-20 h-20 w-[640px] rounded-xl bg-white mb-10 mx-5'>
                                                <div className='flex w-1/2 py-4'>
                                                    <Image src={match.teams.home.logo} width={50} height={50} alt='' />
                                                    <p className='pt-3'>{match.teams.home.name}</p>
                                                </div>

                                                <div className=''>
                                                    <p className='text-center'>{match.fixture.date.slice(11, 16)}</p>
                                                    <form className='flex'>
                                                        <input className='h-12 w-8 border-2 border-gray-300  rounded-lg' />
                                                        <p className='mx-2 mt-2'>-</p>
                                                        <input className='h-12 w-8 border-2 border-gray-300 rounded-lg' />
                                                    </form>
                                                </div>

                                                <div className='flex w-1/2 justify-end py-4'>
                                                    <p className='pt-3'>{match.teams.away.name}</p>
                                                    <Image src={match.teams.away.logo} width={50} height={50} alt='' />
                                                </div>
                                            </div>
                                        </Link>
                                }
                            </>
                        )
                    }
                </div>

                {/* Standing table */}
                <div className=' pt-10 mb-20 ml-10'>
                    <div className='h-16 w-full bg-[#243F85] rounded-t-xl'>
                        <p className='text-white text-3xl ml-[40%] font-semibold pt-4'>Standings</p>
                    </div>
                    <div className='overflow-x-auto'>
                        <Table className="rounded-xl text-sm ">
                            <Table.Head className=''>
                                <span />
                                <span />
                                <span>Team</span>
                                <span>pts.</span>
                                <span>Played</span>
                                <span>Scored</span>
                                <span>Form</span>
                                <span />
                            </Table.Head>

                            <Table.Body>
                                {
                                    standing?.response[0]?.league?.standings[0]?.slice(0, 5).map(team =>
                                        <Table.Row key={team.rank}>
                                            <div>{team.rank}</div>
                                            <div><Image src={team.team.logo} width={25} height={25} alt='' /></div>
                                            <div>{team.team.name}</div>
                                            <div>{team.points}</div>
                                            <div>{team.all.played}</div>
                                            <div>{team.all.goals.for}</div>
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

    const leagueRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/leagues?id=${context.params.id}`, options)
    const league = await leagueRes.json();

    return {
        props: {
            matches,
            standing,
            league
        }
    }
}

export default Matches;