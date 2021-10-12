// * CSS
import "./App.css";

// * INBUILT MODULES
import { useState } from "react";
import classNames from "classnames";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// * CHATBOT COMPONENTS
import { Chatbot } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser.js";
import ActionProvider from "./bot/ActionProvider.js";

// * CUSTOM COMPONENTS
import Sidebar from "./components/Sidebar";
import Mic from "./components/Mic";

function App() {
  // ? States
  const [darkmode, setDarkMode] = useState(false);
  const [msgstate, setMsgState] = useState([]);

  const validator = (input) => {
    if (input.length > 1) return true;
    return false;
  };

  const saveMessages = (messages, HTMLString) => {
    console.log(messages);
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = async () => {
    const messages = await JSON.parse(localStorage.getItem("chat_messages"));
    console.log(messages);
    return messages;
  };

  return (
    <div class={classNames("main-container", { dark: darkmode })}>
      {/* DARK MODE BUTTON */}
      <button class="theme-button" onClick={() => setDarkMode(!darkmode)}>
        {!darkmode ? "🌞" : "🌙"}
      </button>

      {/* SIDEBAR */}
      <Sidebar />

      {/* CHATBOT */}
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText="Allegro Assistant"
        validator={validator}
        messageHistory={loadMessages()}
        saveMessages={saveMessages}
      />

      {/* MICROPHONE MODULE */}
      <Mic />
    </div>
  );
}

export default App;
