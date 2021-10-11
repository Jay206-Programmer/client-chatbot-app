import axios from "axios";

class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  greet() {
    const greetingMessage = this.createChatbotMessage("Hey");
    this.updateChatbotState(greetingMessage);
  }

  warn() {
    this.updateChatbotState(this.createChatbotMessage("Empty input received!"));
  }

  async handleQuery(msg) {
    // this.updateChatbotState(
    //   this.createChatbotMessage("Getting From the Database...")
    // );

    await axios
      .post("http://localhost:8000/parse_query", {
        sentence: msg,
      })
      .then((result) => {
        if (result.data.status_code == 200) {
          const Message = this.createChatbotMessage(result.data.message);
          this.updateChatbotState(Message);
        } else {
          const Message = this.createChatbotMessage(
            "Failed to fetch the data, please try again!"
          );
          this.updateChatbotState(Message);
        }
      })
      .catch((err) => {
        this.updateChatbotState(
          this.createChatbotMessage("Something went wrong! Please try again.")
        );
        console.log(err);
      });
  }

  // createClientMesssage = (message) => {
  //   const clientMessage = {
  //     message: message,
  //     type: "user",
  //     id: new Date(),
  //   };

  //   return clientMessage;
  // };

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
