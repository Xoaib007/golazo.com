import Image from "next/image";

const Lineup = ({ players }) => {
    return (
        <div className="py-20 px-40 ">
            <p className="text-5xl pl-5 border-l-8 border-black mb-8">{players?.response[0]?.statistics[0]?.team?.name}</p>
            <div className="grid grid-cols-5 gap-20 ">
                {
                    players?.response?.map(player =>
                        <div className="w-48 h-72 border-2 border-gray-400">
                            <Image src={player.player.photo} width={192} height={192} alt='' />
                            <p className="text-xl font-bold text-center mt-5 mx-2">{player.player.name}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fa3c6269c2mshe9f544ced1685dcp1ef0d8jsn46c5b3c091cb',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
};

export const getServerSideProps = async (context) => {

    const playersRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${context.params.lineup}&season=2020`, options)
    const players = await playersRes.json();

    return {
        props: {
            players
        }
    }
}

export default Lineup;