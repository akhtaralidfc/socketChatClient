import React, { useState } from 'react'
import "./Join.css"
import logo from "../../images/logo.png"
import {Link} from 'react-router-dom'
// import Link from 'link-react';

let user;
const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
  // console.log(user);
}
const Join = () => {
  const [name, setName] = useState("");
  return (
    <div className='JoinPage'>
        <div className='JoinContainer'>
           <img src={logo} alt="img"/>
           <h1> ToP G CHAT </h1>
           <input onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
           <Link onClick={(event)=> !name? event.preventDefault():null} to="/chat"> <button onClick={sendUser} className="joinBtn"> Log IN </button> </Link>
        </div>
    </div>
  )
}

export default Join;
export {user}