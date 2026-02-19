import './App.css'
import MainContainer from './components/MainContainer'

function App() {
    return(
      //<MainContainer />
      <div className="parent">
          <div className="sidebar">sidebar</div>
          <div className="chatContainer">typing container</div>
          <div className="terraImageContainer">terra image</div>
          <div className="chatWindow"> chat window </div>
      </div> 
    )
}

export default App;
/*
- figuring out design + overall layout
- finish basic frontend
- make python api thing
- connect ai to the frontend
- make it pretty
- additiona features and testing

*/