import React from 'react'
import Tilt from 'react-parallax-tilt';
 import './Logo.css';
 import brain from './brain.png';


const Logo = () =>{
    return(
        <Tilt className='tilt'>
        <div className=' logo br2 shadow-2 pa3'>
            <img src={brain}/>
        </div>
      </Tilt>    )
}


export default Logo