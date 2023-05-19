export const getMessageHistory = (messages, newMessage) => {
  const formattedMessageArray = mapChatModalMessagesToGenstudio(messages);
  formattedMessageArray.push(getGenstudioChatObject(newMessage, false));
  console.log(formattedMessageArray);
  return formattedMessageArray;
}

const mapChatModalMessagesToGenstudio = (messages) => {
  const genstudioMessages = messages.map((message) => {
    const isBot = message.type === "bot";
    return isBot ? getGenstudioChatObject(message.message.props.children, isBot) : getGenstudioChatObject(message.message, isBot);
  });
  return genstudioMessages;
}

const getGenstudioChatObject = (message, isBot) => {
  return {
    content: message,
    role: isBot ? "assistant" : "user",
  };
}