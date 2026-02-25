import "../Styles/Layout.css";
import ChatWindow from "./ChatWindow";
import Sidebar from './Sidebar';
import TerraImageContainer from "./TerraImageContainer";
import TypingArea from "./TypingArea";
import { useState } from "react";

function Layout(){

    const sampleMessages = [
        {sender: "user", message: "Hello there!", time: "12:00:00"},
        {sender: "terra", message: "Greetings, human.", time: "12:01:30"},
        {sender: "user", message: "What can you do?", time: "12:02:15"},
        {sender: "terra", message: "I can assist you with various tasks and provide information on a wide range of topics. How can I help you today?", time: "12:03:45"},
        {sender: "user", message: "What can you do?", time: "12:02:15"}
    ];

    const [messages, setMessages] = useState(sampleMessages);

    return (
        <div className="parent">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="chatContainer">
                <TypingArea setMessages={setMessages} />
            </div>
            <div className="terraImageContainer">
                <TerraImageContainer />
            </div>
            <div className="chatWindow">
                <ChatWindow messages={messages}/>
            </div>
      </div> 
    )
}

export default Layout;;