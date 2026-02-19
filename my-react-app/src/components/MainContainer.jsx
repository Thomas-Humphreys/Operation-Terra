import Sidebar from "./Sidebar";
import "../Styles/containers.css";
import ChatContainer from "./ChatContainer";

function MainContainer(){
    return(
        <main className="mainContainer">
            <Sidebar /> 
            <ChatContainer />
        </main>
    )
}

export default MainContainer;