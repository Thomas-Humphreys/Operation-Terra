import TypingArea from "./TypingArea";

function ChatContainer(){
    return (
        <div className="chatContainer">
            <div className="visualChatSection"></div>
            <div className="typingContainer">
                <TypingArea /> {/* where text is entered into */}
                <button></button> {/* send button */}
            </div>
        </div>
    )
}

export default ChatContainer;