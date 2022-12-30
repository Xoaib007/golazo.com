import React from 'react';

const Matches = () => {
    return (
        <div className='min-h-screen'>
<p>Hiiiiiiiiii</p>
<p>there</p>
<p>Everythings ok?</p>
        </div>
    );
};

// export const getServerSideProps = async (context) => {

//     const matchRes = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${context.params.id}&season=${context.query.season}`, options)
//     const match = await matchRes.json();

//     return {
//         props: {
//             match,
//         }
//     }
// }


export default Matches;