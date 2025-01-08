import * as React from "react";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import MessageList from "./MessegeList.tsx";
import MessageInput from "./MessegeInput.tsx";
import type { Message } from "../../store/types";

const ChatPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "600px",
  maxWidth: "800px",
  margin: "0 auto",
  overflow: "hidden",
}));

const ChatContainer = (): JSX.Element => {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      text: "Привет! Как дела?",
      sender: "user",
      timestamp: "10:00",
    },
    {
      id: 2,
      text: "Здравствуйте! Все хорошо, спасибо. Чем могу помочь?",
      sender: "assistant",
      timestamp: "10:01",
    },
  ]);

  const [newMessage, setNewMessage] = React.useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  return (
    <ChatPaper elevation={3}>
      <MessageList messages={messages} />
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
      />
    </ChatPaper>
  );
};

export default ChatContainer;
