import "../Styles/chatWindow.css";
import TextMessage from "./TextMessage.jsx";
import { useEffect, useRef } from 'react'


function ChatWindow({messages}){

    // https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);


    return (
            <div className="chat">
                {/* <div className ="chatTime">{messages[0]?.time}</div> */}
                {messages.map((message, index) => (
                    // messages[index-1]?.sender == message.sender ? "addTopBorderRadius" : "",
                    //     <TextMessage style={{borderTopRightRadius: "5px"}} key={index} sender={message.sender} message={message.message} /> :
                    //     <TextMessage key={index} sender={message.sender} message={message.message} time={message.time} />
                        
                    <TextMessage key={index} sender={message.sender} message={message.message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
    )
}

export default ChatWindow;