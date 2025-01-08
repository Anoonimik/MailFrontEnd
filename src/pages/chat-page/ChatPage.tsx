import AppTheme from "../../shared-theme/AppTheme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import ChatContainer from "../../components/Chat/ChatContainer.tsx";

export default function HomePage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <div>
        <ChatContainer />
      </div>
    </AppTheme>
  );
}
