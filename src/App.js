import { useState, useEffect } from "react";
import classNames from "classnames";

import {
  Chatbot,
  createClientMessage,
  createChatBotMessage,
} from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./App.css";
import cb_logo from "./Allegro-MicroSystems-H-Tagline-TM-CMYK.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser.js";
import ActionProvider from "./bot/ActionProvider.js";

function App() {
  // ? Demo messages
  var demoMessages = [
    "tell me the revenues for today",
    "can I know the revenues for customer tyco",
    "sales for product segment optical",
  ];
  const getDemoMsg = () =>
    demoMessages[Math.floor(Math.random() * demoMessages.length)];

  // ? States
  const [demonote, setDemoNote] = useState(getDemoMsg);
  const [darkmode, setDarkMode] = useState(false);
  const [msgstate, setMsgState] = useState([]);

  
  const validator = (input) => {
    if (input.length > 1) return true;
    return false;
  };

  const saveMessages = (messages, HTMLString) => {
    console.log(messages)
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = async () => {
    const messages = await JSON.parse(localStorage.getItem("chat_messages"));
    console.log(messages)
    return messages;
  };

  return (
    <div class={classNames("main-container", { dark: darkmode })}>
      <div class="sidebar">
        <div class="intro-container">
          <div class="allegro-logo">
            <img src={cb_logo} alt="" width="50%" />
          </div>
          <div>
            <h3>AI Assistant</h3>
            <div class="intro-container-demo-text">
              try "<b>{demonote}</b>"
            </div>
            {/* <button onClick={() => setDemoNote(getDemoMsg)}>another</button> */}
          </div>
        </div>
      </div>
      <button class="theme-button" onClick={() => setDarkMode(!darkmode)}>
        {!darkmode ? "🌞" : "🌙"}
      </button>
      {/* <header className="App-header"> */}
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText="Allegro Assistant"
        validator={validator}
        messageHistory={loadMessages()}
        saveMessages={saveMessages}
      />
      {/* </header> */}
    </div>
  );
}

export default App;
