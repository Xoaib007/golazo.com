const Lineup = ({ players }) => {
    return (
        <div>
            {
                players?.response?.map(player =>
                    <div>
                        <p>{player.player.name}</p>
                        <Image src={player.player.photo} width={64} height={64} alt='' />
                    </div>
                )
            }
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

    const playersRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?team=${context.params.lineup}`, options)
    const players = await playersRes.json();

    return {
        props: {
            players
        }
    }
}

export default Lineup;