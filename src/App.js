import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./App.css";
// import cb_logo from "./1540869642.png";

import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser.js";
import ActionProvider from "./bot/ActionProvider.js";

function App() {
  return (
    <div class="main-container">
      <div class="sidebar">
        <div class="intro-container">
          {/* <div class="image-container" style={}>
            <img src={cb_logo} alt="" width="50%" />
          </div> */}
          <div>
            <h3>Allegro Assistant</h3>
          </div>

        </div>
      </div>
      {/* <header className="App-header"> */}
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText="Allegro Assistant"
      />
      {/* </header> */}
    </div>
  );
}

export default App;
