import { useState, useEffect } from "react";
import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

// ? Mic
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Mic() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // const [msgstate, setMsgState] = useState([]);

  const handleSaveNote = () => {
    if (!listening) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
      console.log(transcript)
      resetTranscript();
    }
  };
  const handleCancelNote = () => {
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <>
      {listening &&
        browserSupportsSpeechRecognition &&
        isMicrophoneAvailable && (
          <div className="speech-rec-div">{transcript}</div>
        )}
      {listening && !browserSupportsSpeechRecognition && (
        <div className="speech-rec-div">
          Your browser doesn't support Speech Recognition!
        </div>
      )}
      {listening &&
        browserSupportsSpeechRecognition &&
        !isMicrophoneAvailable && (
          <div className="speech-rec-div">
            Please provide microphone access to use voice assistant!
          </div>
        )}
      <div
        className={classNames("mic-container", { "is-listening": listening })}
      >
        {listening && (
          <button
            className={classNames("cross-button")}
            onClick={handleCancelNote}
          >
            ❌
          </button>
        )}
        <button
          className={classNames("mic-button", {
            "mic-is-listening": listening,
          })}
          onClick={handleSaveNote}
        >
          {!listening ? <FontAwesomeIcon icon={faMicrophone} /> : "✔"}
        </button>
      </div>
    </>
  );
}
