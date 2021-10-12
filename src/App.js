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

// ? Mic
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

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
  const [islistening, setListening] = useState(false);
  const [demonote, setDemoNote] = useState(getDemoMsg);
  const [darkmode, setDarkMode] = useState(false);

  const [note, setNote] = useState(null);
  const [msgstate, setMsgState] = useState([]);

  useEffect(() => {
    handleListen();
  }, [islistening]);

  const handleListen = () => {
    if (islistening) {
      mic.start();
      mic.onend = () => {
        // console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        // console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      // console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      // console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setListening(!islistening);
    if (!islistening) {
      let ap = new ActionProvider(
        createChatBotMessage,
        setMsgState,
        createClientMessage
      );
      // ap.userMessage(note);
      ap.speechRecognizeInput(note);
      setNote("");
    }
  };
  const handleCancelNote = () => {
    setListening(!islistening);
    setNote("");
  };

  const validator = (input) => {
    if (input.length > 1 && !islistening) return true;
    return false;
  };

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
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
      {islistening && <div className="speech-rec-div">{note}</div>}
      <div
        className={classNames("mic-container", { "is-listening": islistening })}
      >
        {islistening && (
          <button
            className={classNames("cross-button")}
            onClick={handleCancelNote}
          >
            ❌
          </button>
        )}
        <button
          className={classNames("mic-button", {
            "mic-is-listening": islistening,
          })}
          onClick={handleSaveNote}
        >
          {!islistening ? <FontAwesomeIcon icon={faMicrophone} /> : "✔"}
        </button>
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
