import React from 'react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
  <div className='mainWrapper d-flex align-items-center justify-content-center gap-5 '>
      <div className=''>
        <img className=' mainImg' src={'/imgs/MainLogo.png'} alt="" />
      </div>
      <div className='d-flex flex-column gap-4 align-items-center text-light'>
        <div className='text-center'>
          <p className='longText'>Where creativity converges in real-time.
            Collaborate, draw, and design effortlessly with friends. 
            Unleash your imagination, share your passion, and craft art together seamlessly.</p>
          <p>Get started Today!</p>
        </div>
        <Link to={'/app'} className='btn  btnMain'>Use Now!</Link>
      </div>

  </div>
  )
}

{/* <div></div>
*/}

