import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { user } from "../Join/Join";
import socketIO from "socket.io-client";
import sendLogo from "../../images/send.png";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png";
import Message from '../Message/Message';

// const ENDPOINT="http://localhost:4500";
const ENDPOINT="https://socketserver-w2pv.onrender.com/";
let socket;

const Chat = () => {
  const [id, setId] = useState("")
  const [messages, setmessages] = useState([])


  const send =()=>{
    const message=document.getElementById("chatInput").value;
    socket.emit('message',{message,id})
    document.getElementById("chatInput").value="";
  }

  useEffect(() => {
    socket=socketIO(ENDPOINT,{transports:['websocket']});
    socket.on("connect",()=>{
      // alert("Connected")
      setId(socket.id);
      socket.emit('joined',{user})
    })
    socket.on('welcome',(data)=>{
      setmessages([...messages,data]);
      console.log("welcome")
      console.log(data.user,data.message);
    })
    return () => {
      // socket.emit("disconnect");
      // socket.disconnect();
      socket.off();
    }
  },[])
  useEffect(() => {
     socket.on('userJoined',(data)=>{
      setmessages([...messages,data]);
      console.log(`${data.user} joimed`)
      console.log(data.user,data.message);
    })
    return () => {
      socket.off();
    }
  }, [messages])
  useEffect(() => {
    socket.on('leave',(data)=>{
      setmessages([...messages,data]);
      console.log(`${data.user} lefttt`)
      console.log(data.user,data.message)
    })
  }, [messages])
  useEffect(() => {
    socket.on('sendMessage',(data)=>{
      setmessages([...messages,data]);
      console.log(data.user,data.message,data.id);

  })
    return () => {
      socket.off();
    }
  }, [messages])
  
  return (
    <div className='chatPage'>
        <div className="chatContainer">
          <div className="header">
            <h2>ToP G CHAT</h2>
            <a href='/'><img src={closeIcon} alt="cross"/></a>
          </div>
          <ReactScrollToBottom className="chatBox">
            {messages.map((itemm,i)=><Message user={itemm.id===id?'':itemm.user} msg={itemm.message} classs={itemm.id===id?'right':'left'}/>)}
            {/* <Message component={"hey"}/> */}
          </ReactScrollToBottom>
          <div className="inputBox">
            <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
            <button onClick={send} className='sendBtn'><img src={sendLogo} alt="send"/></button>
          </div>
        </div>
    </div>
  )
}

export default Chat
