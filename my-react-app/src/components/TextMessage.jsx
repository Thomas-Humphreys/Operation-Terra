import "../Styles/textMessage.css";

function TextMessage({sender, message, time}){

    const senderCSS = sender === "user" ? "userMessage" : "terraMessage";
    return(
        <div className={`textMessage ${senderCSS}`}>
            {/* <div className="sender">{sender}</div> */}
            <div className="message">{message}</div>
            <div className="time">{time}</div>
        </div>      
    )
}

export default TextMessage;