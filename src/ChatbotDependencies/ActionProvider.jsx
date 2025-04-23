import React from "react";
import yesNoWidget from "./YesNoWidget.jsx";
import axios from "axios";

const ActionProvider = ({ createChatBotMessage, setState, children, setEmployeeTakeover }) => {
  const [promptAsked, setPromptAsked] = React.useState(false);
  const [isResponding, setIsResponding] = React.useState(false);
  const [hasAnsweredPrompt, setHasAnsweredPrompt] = React.useState(false);
  const jwtToken = localStorage.getItem('jwtToken');
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handleCustomerSupport = () => {
    console.log("Takeover!")
    const botMessage = createChatBotMessage(
      "It seems I might not have the answer to your question. Our Customer Support team will handle this chat for you.."
    );
    setEmployeeTakeover(true);
    console.log("Set employee takeover");
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handlebyebye = () => {
    const botMessage = createChatBotMessage(
        "Bye Bye "

    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };
  const handlePrompt = () => {
    if (!promptAsked) {
      const botMessage = createChatBotMessage("Did you like our chatbot's service?", {
        widget: "yesNoWidget",
      });
      setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
      setPromptAsked(true);
    }
  };
  const handleYesNo = (value) => {
    const userData = {
      satisfied: value,
    };
    if(!value && hasAnsweredPrompt === false){
      const botMessage = createChatBotMessage("Thank you for your answer!");
      setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
      setPromptAsked(true);
      setHasAnsweredPrompt(true)
    }
    else if(value && hasAnsweredPrompt === false){
      const botMessage = createChatBotMessage("Thank you for your answer!");
      setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
      setPromptAsked(true);
      setHasAnsweredPrompt(true)
    }
    if( hasAnsweredPrompt === false){
      axios.post(`http://localhost:8080/feedback/customer`, userData, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`
        }

      });
    }
    console.log(value)
  };

  const startTimer = () => {
    setTimeout(() => {
      if (!isResponding) {
        handlePrompt();
      }
    }, 3000); // 30 seconds
  };
  const stopTimer = () => {
    // Clear the timer
    clearTimeout(timer);
  };
  const handleResponse = () => {
    setIsResponding(true);
    stopTimer();
    startTimer();
  };
  const handleInactivity = () => {
    setIsResponding(false);
    startTimer();
  };
  React.useEffect(() => {
    startTimer();
  }, []);
  const handleAccountCreate = () => {
    const botMessage = createChatBotMessage(
      "Feel free to create another account if needed."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handlePasswordReset = () => {
    const botMessage = createChatBotMessage(
      "Yes. You can do that from the profile page."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };

  const handleBid = () => {
    const botMessage = createChatBotMessage(
      "It depends. Please contact customer support for further information."
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };
  const handleDemocracy = () => {
    const botMessage = createChatBotMessage(
        "o7, for democracy brudda!!!"
    );
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };
  const handleLink = () => {
    const changedMessage = "deleted message";
    const botMessage = createChatBotMessage(
        "malicious link detected"
    );

    setState((prev) => {
      const updatedMessages = [...prev.messages]; // Create a copy of the messages array
      updatedMessages.pop(); // Remove the last message (the user's message)
      updatedMessages.push(createChatBotMessage(changedMessage)); // Add the changed message
      updatedMessages.push(botMessage); // Add the bot's message
      return { ...prev, messages: updatedMessages }; // Update the state
    });
  };

  const updateLastMessage = (message) => {
    setState((prev) => {
      return { ...prev, messages: [...prev.messages.slice(0, -1), { ...prev.messages.at(-1), message }]};
    });
  };

  const handleQuestion = (answer) => {
    const botMessage = createChatBotMessage(answer);
    setState((prev) => ({ ...prev, messages: [...prev.messages, botMessage] }));
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleCustomerSupport,
            handleAccountCreate,
            handlePasswordReset,
            handleBid,
            handleQuestion,
            handleLink,
            handleResponse,
            handleInactivity,
            handleYesNo,
            handlebyebye,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
