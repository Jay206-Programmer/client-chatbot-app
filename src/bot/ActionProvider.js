import axios from "axios";
import ReactMarkdown from "react-markdown";
import React from "react";

class ActionProvider {
  
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  createChatbotMessageWithMarkdown = (message) => {
    return this.createChatbotMessage(<ReactMarkdown>{message}</ReactMarkdown>)
  }

  greet() {
    const greetingMessage = this.createChatbotMessage("Hey");
    this.updateChatbotState(greetingMessage);
  }

  warn() {
    this.updateChatbotState(this.createChatbotMessage("Empty input received!"));
  }

  async handleQuery(message_history) {
    this.updateChatbotState(this.createChatbotMessage("Thinking 🤔..."))

    await axios
      .post("https://0.0.0.0:8443/generate/query", {
        messages: message_history,
      })
      .then((result) => {
        this.setState((prevState) => ({
          ...prevState,
          messages: prevState.messages.slice(0, -1),
        }));
        const response = result.data;
        const responseMessage = this.createChatbotMessageWithMarkdown(response.message);
        this.updateChatbotState(responseMessage);
      })
      .catch((err) => {
        this.updateChatbotState(
          this.createChatbotMessageWithMarkdown("Something went wrong! Please try again.")
        );
        console.log(err);
      });
  }

  setClientMessage = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

  speechRecognizeInput = (message) => {
    const clientMessage = this.createClientMessage(message);
    this.setClientMessage(clientMessage);
    this.handleQuery(message);
  };
}

export default ActionProvider;
