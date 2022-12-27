import React from 'react';

const Matches = ({ id, season, matches }) => {


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fa3c6269c2mshe9f544ced1685dcp1ef0d8jsn46c5b3c091cb',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const getServerSideProps = async () => {
        const res = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=${season}`, options)
        const matches = await res.json();

        return {
            props: {
                matches
            }
        }
    }

    getServerSideProps();

    return (
        <div>
            <p>{matches?.response[0]?.fixture?.referee}</p>
        </div>
    );
};

export default Matches;