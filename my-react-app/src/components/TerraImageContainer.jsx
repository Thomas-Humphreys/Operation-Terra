import happyTerra from '../assets/happy.png';
import sadTerra from '../assets/sad.png';
import neutralTerra from '../assets/neutral.png';
import angryTerra from '../assets/angry.png';
import { Laugh, Frown, Meh, Angry } from "lucide-react";

import "../Styles/terraImageContainer.css";
function TerraImageContainer({ terraMood = "angry" }){

    let terraImage;

    switch(terraMood){
        case "happy":
            terraImage = happyTerra;
            break;
        case "sad":
            terraImage = sadTerra;
            break;
        case "neutral":
            terraImage = neutralTerra;
            break;
        case "angry":
            terraImage = angryTerra;
            break;
        default:
            terraImage = neutralTerra;
    }

    const moods = [
        { name: "happy", icon: <Laugh />, color: "#c6d448" },
        { name: "neutral", icon: <Meh />, color: "#48d472" },
        { name: "sad", icon: <Frown />, color: "#48b1d4" },
        { name: "angry", icon: <Angry />, color: "#d46448" }
    ];
    
    return(
        <div className="terraImageContainer">
            <img id="terraImage" src={terraImage} alt="Happy Terra" width="350px" height="450px" />
            <div className="moodIndicatorBar">
                {moods.map((mood) => (
                    <div 
                        key={mood.name}
                        className={`moodButton ${mood.name} ${terraMood === mood.name ? 'active' : ''} ${terraMood === "angry" && mood.name === "angry" ? 'angryGlow' : ''} `}
                        style={{ backgroundColor: terraMood === mood.name ? mood.color : 'transparent' }}
                    >
                        {mood.icon}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TerraImageContainer;