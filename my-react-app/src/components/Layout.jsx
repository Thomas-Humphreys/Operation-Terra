import "../Styles/Layout.css";
import ChatWindow from "./ChatWindow";
import Sidebar from './Sidebar';
import TerraImageContainer from "./TerraImageContainer";
import TypingArea from "./TypingArea";

function Layout(){
    return (
        <div className="parent">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="chatContainer">
                <TypingArea />
            </div>
            <div className="terraImageContainer">
                <TerraImageContainer />
            </div>
            <div className="chatWindow">
                <ChatWindow />
            </div>
      </div> 
    )
}

export default Layout;;