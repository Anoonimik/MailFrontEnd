import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppTheme from "../../shared-theme/AppTheme";
import SlideMenu from "../../components/dashboard/SideMenu.tsx";
export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        <Divider />
        <SlideMenu />
      </div>
    </AppTheme>
  );
}
