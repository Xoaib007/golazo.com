import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {

    const navItems = ['Home', 'News', 'Leagues', 'Teams', 'Players']
    const navList = <>
        {
            navItems.map(navItem =>
                <Link key={navItem} activeClassName="active" className='btn bg-transparent border-b-8 border-x-0 border-t-0 border-transparent text-black  hover:border-orange-600 hover:bg-transparent rounded-none' href={`/${navItem}`}>{navItem}</Link>
            )
        }

    </>

    const src = 'https://i.ibb.co/6ypFNp8/images-removebg-preview.png'

    return (
        <div className="navbar bg-base-100 h-20 mb-20">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navList}
                    </ul>
                </div>

                <Image loader={() => src} src={src} width={104.5} height={47.3} alt='' />
                <p className='text-xl font-bold lg1'><span className='text-orange-600'>Golazo</span>.com</p>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navList}
                </ul>
            </div>
            <label tabIndex={0} className=" navbar-end hover:bg-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Header;