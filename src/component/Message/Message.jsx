import React from 'react'
import "./Message.css"

const Message = ({user,msg,classs}) => {
    if(user){
        return (
            <div className={`messageBox ${classs}`}>
              {`${user}:${msg}`}
            </div>
        )
    }else{
        return (
            <div className={`messageBox ${classs}`}>
              {`You:${msg}`}
            </div>
        )
    }
 
}

export default Message
