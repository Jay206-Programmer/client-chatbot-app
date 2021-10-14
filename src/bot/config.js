import { createChatBotMessage } from "react-chatbot-kit";

import { Updates } from "../components/updates_widget/updates_widget";

const config = {
  initialMessages: [createChatBotMessage(`Hello! How can I help you?`)],
  widgets: [
    {
      widgetName: "Updates",
      widgetFunc: (props) => <Updates {...props} />,
      mapStateToProps: ["update_arr"],
    },
  ],
  state: {
    update_arr: [],
  },
};

export default config;
