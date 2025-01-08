import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageInput = ({
  value,
  onChange,
  onSend,
}: MessageInputProps): JSX.Element => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <Box sx={{ p: 2, backgroundColor: "background.default" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Введите сообщение..."
          variant="outlined"
          size="small"
        />
        <IconButton color="primary" onClick={onSend} disabled={!value.trim()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageInput;
