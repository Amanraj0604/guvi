import React from 'react'
import "../home/homee.css"
import {Link} from 'react-router-dom';
const Homee = () => {
  return (
    <div>
       <div className="navbar">
            <div className="left">
            <img src="https://www.guvi.in/web-build/images/foot-guvi-logo.7516cb093c7727e01f9332234baea44a.webp" alt="" />
            </div>
            <div className="right">
            <Link to='https://amanraj-portfolio2.000webhostapp.com/'><button className='logbutt'>Click Hear to go my Portfolio website</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Homee
