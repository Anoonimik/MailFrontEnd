import { Box, Avatar, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Message } from "../../store/types";

const MessageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  "&.user": {
    flexDirection: "row-reverse",
    "& .message-content": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

const MessageContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1.5),
  maxWidth: "70%",
  borderRadius: theme.shape.borderRadius,
}));

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
      {messages.map((message) => (
        <MessageContainer
          key={message.id}
          className={message.sender === "user" ? "user" : ""}
        >
          <Avatar sx={{ m: 1 }}>{message.sender === "user" ? "U" : "A"}</Avatar>
          <Box sx={{ maxWidth: "70%" }}>
            <MessageContent className="message-content">
              <Typography variant="body1">{message.text}</Typography>
            </MessageContent>
            <Typography
              variant="caption"
              sx={{ ml: 1, color: "text.secondary" }}
            >
              {message.timestamp}
            </Typography>
          </Box>
        </MessageContainer>
      ))}
    </Box>
  );
};

export default MessageList;
