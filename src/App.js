import { useState, useEffect } from 'react';
import classNames from "classnames"

import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import "./App.css";
// import cb_logo from "./1540869642.png";

import config from "./bot/config.js";
import MessageParser from "./bot/MessageParser.js";
import ActionProvider from "./bot/ActionProvider.js";

function App() {

  // ? Demo messages
  var demoMessages = ['tell me the revenues for today','can I know the revenues for customer tyco','sales for product segment optical']
  const getDemoMsg = () => demoMessages[Math.floor(Math.random()*demoMessages.length)]

  // ? States
  // const [islistening, setListening] = useState(false)
  const [demonote, setDemoNote] = useState(getDemoMsg)
  const [darkmode, setDarkMode] = useState(false)

  return (
    <div class={classNames("main-container", { dark: darkmode })}>
      <div class="sidebar">
        <div class="intro-container">
          {/* <div class="image-container" style={}>
            <img src={cb_logo} alt="" width="50%" />
          </div> */}
          <div>
            <h3>AI Assistant</h3>
            <div class="intro-container-demo-text">try "<b>{demonote}</b>"</div>
            {/* <button onClick={() => setDemoNote(getDemoMsg)}>another</button> */}
          </div>
        </div>
      </div>
      <button class='theme-button' onClick={()=>setDarkMode(!darkmode)}>{!darkmode ? '🌞' : '🌙'}</button>
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
