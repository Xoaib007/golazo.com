import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import React from 'react';

const SearchBar = ({placeholder}) => {
    return (
        <div className=" hidden lg:flex">

            <form className="form-control flex flex-row">

                <input type="text" placeholder={placeholder} className="w-96 h-12 rounded-l-full input input-bordered" />

                <button type='submit' className=' bg-blue-400  w-20 rounded-full relative right-10'><FontAwesomeIcon icon={faSearch} /></button>

            </form>

        </div>
    );
};

export default SearchBar;