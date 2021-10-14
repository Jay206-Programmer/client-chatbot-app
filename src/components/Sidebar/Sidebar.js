import { useState } from "react";

import cb_logo from "../../Images/Allegro-MicroSystems-H-Tagline-TM-CMYK.jpg";

export default function Sidebar() {
  // ? Demo messages
  var demoMessages = [
    "tell me the revenues for today",
    "can I know the revenues for customer tyco",
    "sales for product segment optical",
  ];
  const getDemoMsg = () =>
    demoMessages[Math.floor(Math.random() * demoMessages.length)];

  const [demonote, setDemoNote] = useState(getDemoMsg);

  return (
    <div className="sidebar">
      <div className="intro-container">
        <div className="allegro-logo">
          <img src={cb_logo} alt="" width="50%" />
        </div>
        <div>
          <h3>AI Assistant</h3>
          <div className="intro-container-demo-text">
            try "<b>{demonote}</b>"
          </div>
          {/* <button onClick={() => setDemoNote(getDemoMsg)}>another</button> */}
        </div>
      </div>
    </div>
  );
}
