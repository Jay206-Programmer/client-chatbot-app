import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./App.css";

import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser.js";
import ActionProvider from "./bot/ActionProvider.js";

function App() {
  return (
    <div class="main-container">
      <div class="sidebar">Hi</div>
      {/* <header className="App-header"> */}
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='Database Assistant'
      />
      {/* </header> */}
    </div>
  );
}

export default App;
