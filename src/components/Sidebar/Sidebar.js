import { useState } from "react";

export default function Sidebar() {
  // ? Demo messages
  var demoMessages = [
    "Write me a query to get the company address",
    "Is there any field related to phone number in the schema?"
  ];
  const getDemoMsg = () =>
    demoMessages[Math.floor(Math.random() * demoMessages.length)];

  const [demonote, setDemoNote] = useState(getDemoMsg);

  const getDate = () => {
    const today = new Date();
    
    return `${today.getMonth()+1} / ${today.getDate()} / ${today.getFullYear()}`
  }

  return (
    <div className="sidebar">
      <div className="intro-container">
        <div>
          <h3>GraphQL Helper</h3>
          <div className="intro-container-demo-text">
            try "<b>{demonote}</b>"
          </div>
          <div className="date">{getDate()}</div>
          {/* <button onClick={() => setDemoNote(getDemoMsg)}>another</button> */}
        </div>
      </div>
    </div>
  );
}
