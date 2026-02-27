import "../Styles/textMessage.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function TextMessage({sender, message, time}){
    const senderCSS = sender === "user" ? "userMessage" : "terraMessage";
    return(
        <div className={`textMessage ${senderCSS}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
            <div className="time">{time}</div>
        </div>      
    )
}
export default TextMessage;