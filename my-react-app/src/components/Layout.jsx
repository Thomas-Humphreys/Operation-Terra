import "../Styles/Layout.css";
import ChatWindow from "./ChatWindow";
import Sidebar from './Sidebar';
import TerraImageContainer from "./TerraImageContainer";
import TypingArea from "./TypingArea";
import { useState } from "react";

    const initialQuests =[
        {
            id: 0,
            questName: "Recycle Right",
            questDescription: "Sort your household waste correctly today, making sure all recyclables go in the right bin.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },

        {
            id: 1,
            questName: "Meatless Meal",
            questDescription: "Cook and eat a fully plant-based meal today.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },
        
        {
            id: 2,
            questName: "Walk It",
            questDescription: "Replace one car or bus journey today with walking or cycling.",
            questWinLossPoints: 15,
            currentStatus: "Ongoing"
        },
        {
            id: 3,
            questName: "Donate a Item",
            questDescription: "Find one item of clothing or household goods you no longer need and set it aside to donate.",
            questWinLossPoints: 10,
            currentStatus: "Ongoing"
        },


];

function Layout(){
    const [happyness, setHappyness] = useState(20);
    const [quests, setQuests] = useState(initialQuests);
    const sampleMessages = [
        {sender: "user", message: "Hello there!", time: "12:00:00"},
        {sender: "terra", message: "Greetings, human.", time: "12:01:30"}
    ];

    const [messages, setMessages] = useState(sampleMessages);
    

    return (
        <div className="parent">
            <div className="sidebar">
                <Sidebar quests={quests}/>
            </div>
            <div className="chatContainer">
                <TypingArea 
                    setMessages={setMessages} 
                    happyness={happyness} 
                    setHappyness={setHappyness}
                    quests={quests}
                    setQuests={setQuests}
                />            
            </div>
            <div className="terraImageContainer">
                <TerraImageContainer happyness={happyness}/>
            </div>
            <div className="chatWindow">
                <ChatWindow messages={messages}/>
            </div>
      </div> 
    )
}

export default Layout;;