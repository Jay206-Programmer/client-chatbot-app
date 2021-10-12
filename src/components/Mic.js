import { useState, useEffect } from "react";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

// ? Mic
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function Mic() {
  const [islistening, setListening] = useState(false);
  const [note, setNote] = useState(null);
  const [msgstate, setMsgState] = useState([]);

  useEffect(() => {
    handleListen();
  }, [islistening]);

  const handleListen = () => {
    if (islistening) {
      mic.start();
      mic.onend = () => {
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
      };
    }
    mic.onstart = () => {
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setListening(!islistening);
    if (!islistening) {
      // let ap = new ActionProvider(
      //   createChatBotMessage,
      //   setMsgState,
      //   createClientMessage
      // );
      // // ap.userMessage(note);
      // ap.speechRecognizeInput(note);
      setNote("");
    }
  };
  const handleCancelNote = () => {
    setListening(!islistening);
    setNote("");
  };

  return (
    <>
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
    </>
  );
}
