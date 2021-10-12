class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    console.log(this.state)
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.trim() === "") {
      this.actionProvider.warn();
    } else {
      this.actionProvider.handleQuery(lowerCaseMessage);
    }
  }
}

export default MessageParser;
