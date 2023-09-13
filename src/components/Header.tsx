import React, {useState} from 'react'
import { Link } from "react-router-dom";

export default function Header() {
  const [user,setUser] = useState('')
  return (
    <div className="d-flex align-items-center justify-content-between mx-5">
        <div >
            <Link to='/'><img src={'/FreeCanvas.png'} alt="" /></Link>
        </div>
        <div className="">
            <ul>
                <li className="list-unstyled">
                  {user?
                    <p>Hi {user}</p>
                    :
                    <Link className="text-decoration-none btn btn-outline-secondary" to='/login'>Log in</Link>
                  }
                </li>
            </ul>
        </div>
    </div>
  )
}
