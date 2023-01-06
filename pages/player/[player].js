import Image from "next/image";

const Player = ({singlePlayer}) => {
  return (
    <div className="min-h-screen bg-sky-100">
      <Image src={singlePlayer?.response[0]?.player?.photo} width={256} height={256} alt='' />
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

  const singlePlayerRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/players?id=${context.params.player}&season=${year}`, options)
  const singlePlayer = await singlePlayerRes.json();

  return {
    props: {
      singlePlayer
    }
  }
}

export default Player;