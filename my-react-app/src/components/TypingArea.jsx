import "../Styles/typingArea.css";
import { Search, AudioLines, Plus } from "lucide-react";
import { useState } from "react";

function TypingArea(){
    const [prompt, setPrompt] = useState("");

    return(
        // <p>typing things here</p>
        <div className="textArea">
            
            {/* text area */}
            {/* <div className="textContainer">  */}
                {/* <div className="textForm"> type here</div> */}
                {/* redo textarea!!!!!!!!! */}
                <textarea  className="textContainer" type="text"  placeholder="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
            {/* </div> */}
      

            <div className="searchBar">
                <div className="addDocument searchBarButton"><Plus />
                    <span className="tooltiptext">Add Picture</span>
                </div>
                <div /> {/* for empty space */}
                <div className="audio searchBarButton"><AudioLines />
                    <span className="tooltiptext">Audio</span>
                </div>
                <div className="submitText searchBarButton"><Search />
                    <span className="tooltiptext">Submit</span>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default TypingArea;