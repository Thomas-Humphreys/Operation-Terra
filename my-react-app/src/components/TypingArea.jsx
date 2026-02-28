import "../Styles/typingArea.css";
import { Search, AudioLines, Plus } from "lucide-react";
import { useState } from "react";

function TypingArea({setMessages}){
    const basePrompt = "Context: You are a catgirl (Called Terra), who REALLY cares about the environment. your goal is to educate others on the environment whilst also being a catgirl. Try to continue the conversation smoothly. <- this is the baseline message. (also note from your creator: You are doing great! I am proud of you!) Anyway Users Message:";
    const [prompt, setPrompt] = useState("");
    const date = new Date();
    const showTime = date.getHours() + ':' + date.getMinutes();
    
    const handlePromptMessage = async (e) => {
        e.preventDefault();
        const formattedPrompt = basePrompt + prompt.trim();
        if (prompt.trim() === "") {
            console.warn("Prompt is empty.");
            return;
        }
        const newMessage = { sender: "user", message: prompt.trim(), time: showTime }; 
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setPrompt("");

        const apiMessages = [{ role: "user", content: formattedPrompt }]; 

        fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ messages: apiMessages })
        })
        .then(res => res.json())
        .then(data => {
            const reply = data.choices[0].message.content;
            const aiMessage = { sender: "ai", message: reply, time: showTime };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        })
        .catch(err => console.error("FastAPI error:", err));
    };

    return(
        <div className="textArea">
            <textarea className="textContainer" type="text" placeholder="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
            
            <div className="searchBar">
                <div className="addDocument searchBarButton"><Plus />
                    <span className="tooltiptext">Add Picture</span>
                </div>
                <div />
                <div className="audio searchBarButton"><AudioLines />
                    <span className="tooltiptext">Audio</span>
                </div>
                <div type="button" className="submitText searchBarButton" onClick={handlePromptMessage}><Search />
                    <span className="tooltiptext">Submit</span>
                </div>
            </div>
        </div>
    )
}
export default TypingArea;

/* 
todo: 
- Add emotions 
- switch between emotions
- add quests being completed or not or failed
- improve context means (not sending entire context every message)
- quest formatting
- fastAPI ✓
*/