import "../Styles/typingArea.css";
import { Search, AudioLines, Plus } from "lucide-react";
import { useState } from "react";
function TypingArea({setMessages}){
    const [prompt, setPrompt] = useState("");
    const date = new Date();
    const showTime = date.getHours() + ':' + date.getMinutes();
    
    const handlePromptMessage = async (e) => {
        e.preventDefault();
        const formattedPrompt = prompt.trim();
        if (formattedPrompt === "") {
            console.warn("Prompt is empty.");
            return;
        }
        const newMessage = { sender: "user", message: formattedPrompt, time: showTime };
        
        setMessages(prevMessages => {
            const updated = [...prevMessages, newMessage];
            const apiMessages = updated.map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.message
            }));
            const key = import.meta.env.VITE_GREENPT_API_KEY;
            console.log("API Key:", key);
            fetch("/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${key}`
                },
                body: JSON.stringify({
                    model: "green-r",
                    messages: apiMessages
                })
            })
            .then(res => {
                console.log("Status:", res.status);
                return res.text();
            })
            .then(text => {
                console.log("Raw response:", text);
            })
            .catch(err => console.error("GreenPT error:", err));
            return updated;
        });
        setPrompt("");
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