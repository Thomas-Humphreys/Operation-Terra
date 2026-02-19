import TerraImageContainer from "./TerraImageContainer";
import TypingArea from "./TypingArea";
import ChatWindow from "./ChatWindow";
function ChatContainer(){
    return (
        <div className="chatContainer">
            <div className="visualChatContainer">
                <TerraImageContainer />
                <ChatWindow />
            </div>
            <div className="typingContainer">
                <TypingArea /> {/* where text is entered into */}
                <button></button> {/* send button */}
            </div>
        </div>
    )
}

export default ChatContainer;