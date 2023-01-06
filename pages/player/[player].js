import Image from "next/image";

const Player = ({ singlePlayer }) => {
  return (
    <div className="min-h-screen bg-sky-100 pb-20">

      <div className='leaguebg w-full h-80 flex items-end pb-20 pl-20'>
        <p className='text-5xl text-white ml-5'>Player Profile</p>
      </div>

      <div className="flex justify-center mt-20">
        <div className="mr-20 flex flex-col  justify-center">
          <p className="text-5xl mb-2 ">{singlePlayer?.response[0]?.player?.name}</p>
          <p className="text-2xl mb-1">Nationality: {singlePlayer?.response[0]?.player?.nationality}</p>
          <p className="text-2xl mb-1">Age: {singlePlayer?.response[0]?.player?.age}yrs</p>
          <p className="text-2xl mb-1">Height: {singlePlayer?.response[0]?.player?.height}</p>
        </div>
        <Image src={singlePlayer?.response[0]?.player?.photo} width={192} height={192} alt='' />
      </div>

      <p className="text-5xl pl-5 mt-32 mb-8 text-center">Stats</p>

      <div className="grid grid-cols-1 gap-10">
        {
          singlePlayer?.response[0]?.statistics.map(stat =>
            <div className=" mx-auto bg-white px-10 py-5 rounded-xl flex justify-between items-center">
              <div className="mr-32">
                <p className="text-xl border-l-8 border-gray-700 pl-5">{stat.league.name}</p>

                <div className="flex items-center my-1">
                  <p className="mr-3">Club/Team: </p>
                  <p>{stat.team.name}</p>
                  <Image className="ml-4" src={stat.team.logo} width={37.5} height={37.5} alt='' />
                </div>

                <p>Appearences: {stat.games.appearences}</p>
                <p>Played as a {stat.games.position}</p>
                <p>Goal: {stat.goals.total}</p>
                <p>Assists: {stat.goals.assists = '0' ? 0 : stat.goals.assists}</p>
              </div>

              <div className="w-fit">
                {stat.league.logo ? <Image className="ml-4" src={stat.league.logo} width={150} height={150} alt='' /> : <div className="w-40 h-40" />}
              </div>
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

  let today = new Date();
  let year = today.getFullYear();

  let month = today.getMonth();

  const singlePlayerRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${context.params.player}&season=${month <= 5 ? Number(year) - 1 : year}`, options)
  const singlePlayer = await singlePlayerRes.json();

  return {
    props: {
      singlePlayer
    }
  }
}

export default Player;