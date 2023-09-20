import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="d-flex align-items-center justify-content-between px-5 header-bg">
        <div className='my-1 mt-2 px-4'>
            <Link to='/'><img src={'/imgs/HeaderLogo.png'} style={{width:'200px'}} alt="" /></Link>
        </div>
        <div className="">
            <ul style={{marginBottom:0}}>
                    <li className="list-unstyled d-flex align-items-center">
                        <Link className="text-decoration-none btnLogin text-white" to='/app'>APP</Link>
                    </li>
            </ul>
        </div>
    </div>
  )
}
