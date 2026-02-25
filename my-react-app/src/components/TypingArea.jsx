import "../Styles/typingArea.css";
import { Search, AudioLines, Plus } from "lucide-react";
import { useState } from "react";
import "./ChatWindow.jsx";
// import axios from "axios";

function TypingArea({setMessages}){
    const [prompt, setPrompt] = useState("");

    const date = new Date();
    const showTime = date.getHours() + ':' + date.getMinutes();
    
        
    // const BACKEND_URL = 'http://localhost:5000';
    
    const handlePromptMessage = async (e) => {
            e.preventDefault();
            const formattedPrompt = prompt.trim();

            if (formattedPrompt === "") {
                console.warn("Prompt is empty. Please enter a valid prompt.");
                return;
            }

            // try {
            //     const response = await axios.post(`${BACKEND_URL}/prompt`, { prompt: formattedPrompt });
            //     setMessages(prevMessages => [...prevMessages, { sender: "terra", message: response.data, time: showTime }]);
            //     console.log(response.data);

            // }
            // catch (error) {                
            //     console.error("Error sending prompt:", error);
            // }

            const newMessage = {
                sender: "user",
                message: formattedPrompt,
                time: showTime
            };
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setPrompt("");
        };

    return(
        <div className="textArea">
            <textarea  className="textContainer" type="text"  placeholder="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
            
            <div className="searchBar">
                <div className="addDocument searchBarButton"><Plus />
                    <span className="tooltiptext">Add Picture</span>
                </div>
                <div /> {/* for empty space */}
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