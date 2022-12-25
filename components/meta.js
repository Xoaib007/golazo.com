import Head from 'next/head';
import React from 'react';

const Meta = ({title,keywords, description }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta httpEquiv='X-UA-Compitable' content='IE=edge' />
            <meta name='viewport' content='width=device-width, initial-scale=1'/>
            <meta name='keywords' content={keywords}/>
            <meta name='description' content={description}/>
        </Head>
    );
};

Meta.defaultProps ={
    title: 'Golazo.com',
    keywords: '',
    description: ''
}


export default Meta;