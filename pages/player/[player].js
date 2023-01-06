import Image from "next/image";

const Player = ({ singlePlayer }) => {
  return (
    <div className="min-h-screen bg-sky-100">
      <div className="flex justify-center">
        <div>
          <p className="text-3xl ">{singlePlayer?.response[0]?.player?.name}</p>
          <p>Nationality: {singlePlayer?.response[0]?.player?.nationality}</p>
          <p>Age: {singlePlayer?.response[0]?.player?.age}yrs</p>
          <p>Height: {singlePlayer?.response[0]?.player?.height}</p>
        </div>
        <Image src={singlePlayer?.response[0]?.player?.photo} width={192} height={192} alt='' />
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