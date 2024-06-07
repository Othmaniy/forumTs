import React from 'react'
import { useAuth } from './Auth'
import { Link } from 'react-router-dom';

function Header() {
    console.log(useAuth());
    const Authcheck =useAuth();
    console.log(Authcheck?.currentuser?.userid);
    console.log(Authcheck);
  return (
    <>
    <div className='header flex justify-evenly text-red-600 bg-gray-400 p-4'>
        <div>
            <p>logo</p>
        </div>
        <div>
            <ul className=' flex flex-row gap-6'>
                <li> <a href=""> home</a></li>
                <li> <a href="/questions">questions</a> </li>
                {/* <li> <a href="">answer</a> </li> */}
            </ul>
        </div>
        <div>
            {Authcheck?.islogged?<button>{`welcome ${Authcheck?.currentuser?.Username}`}</button>: <Link  to={"/login"}>
            <button>
                login
            </button>
            </Link>}
            
            
            
        </div>

    </div>

    </>
  )
}

export default Header