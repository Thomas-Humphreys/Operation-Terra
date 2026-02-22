import "../Styles/typingArea.css";


function TypingArea(){
    return(
        // <p>typing things here</p>
        <div className="textArea">
            {/* text area */}
            <div className="textInput">

            </div>

            <div className="searchBar">
                <div className="addDocument searchBarButton"> 1 </div>
                <div>empty </div>
                <div className="audio searchBarButton"> 2 </div>
                <div className="submitText searchBarButton"> 3 </div>
            </div>
        </div>
    )
}

export default TypingArea;