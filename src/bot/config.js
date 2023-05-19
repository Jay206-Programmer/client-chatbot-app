import { createChatBotMessage } from "react-chatbot-kit";
import ReactMarkdown from "react-markdown";
import React from "react";

import { Updates } from "../components/updates_widget/updates_widget";

const config = {
  initialMessages: [createChatBotMessage(<ReactMarkdown>Hi there! 👋 I'm **GraphQL Helper**. You can ask me to create a query or ask any schema related questions.</ReactMarkdown>)],
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
