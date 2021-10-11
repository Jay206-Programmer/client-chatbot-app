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

  async handleQuery(msg) {
    this.updateChatbotState(
      this.createChatbotMessage("Getting From the Database...")
    );

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
        console.log(err);
      });
  }

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
