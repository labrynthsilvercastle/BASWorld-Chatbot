import { createChatBotMessage } from "react-chatbot-kit";
import YesNoWidget from "./YesNoWidget.jsx";
import CustomHeader from "./CustomHeader.jsx";
import BotAvatar from "./BotAvatar.jsx";

const botName = "BasWorld Bot";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage("Hello! How can I help you today?")],
  customStyles: {
    botMessageBox: { backgroundColor: "#1da15e" },
    chatButton: { backgroundColor: "#1da15e" },
  },
  customComponents:{
    header:()=> CustomHeader(),
    botAvatar:()=>BotAvatar()
  },
  widgets: [
    {
      widgetName: "yesNoWidget",
      widgetFunc: (props) => YesNoWidget({ ...props, onSelect: props.actions.handleYesNo }),
    },
  ],
};

export default config;
