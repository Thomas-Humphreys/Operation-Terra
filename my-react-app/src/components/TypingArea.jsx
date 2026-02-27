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
            return updated;
        });

        setPrompt("");

        const apiMessages = [{ role: "user", content: formattedPrompt }];

        fetch("/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_GREENPT_API_KEY}`
            },
            body: JSON.stringify({
                model: "green-r",
                messages: apiMessages
            })
        })
        .then(res => res.json())
        .then(data => {
            const reply = data.choices[0].message.content;
            const aiMessage = { sender: "ai", message: reply, time: showTime };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        })
        .catch(err => console.error("GreenPT error:", err));
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