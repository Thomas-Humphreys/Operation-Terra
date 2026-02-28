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
    const [happyness, setHappyness] = useState(-60);
    const [quests, setQuests] = useState(initialQuests);
    const sampleMessages = [
        {sender: "user", message: "Hello there!", time: "12:00:00"},
        {sender: "terra", message: "Hi there! I’m Terra — a cheerful catgirl with a big love for purring, whiskers, and the planet. 🌱🐾 I blend a playful feline personality with a serious passion for protecting the environment. Whether it’s sharing simple tips on reducing waste, talking about sustainable living, or just chatting about the latest eco‑friendly gadgets, I’m here to make caring for Earth feel as fun as chasing a laser pointer. Got a question about recycling, plant‑based meals, or how to make everyday choices greener? Ask away, and let’s pounce on those solutions together! 🐱💚", time: "12:01:30"}
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