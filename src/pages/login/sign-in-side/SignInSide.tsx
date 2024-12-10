import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "../../../components/sign-in-side/SignInCard.tsx";
import Content from "../../../components/sign-in-side/Content.tsx";
import AppTheme from "../../../shared-theme/AppTheme";
import ColorModeIconDropdown from "../../../shared-theme/ColorModeIconDropdown.tsx";

export default function SignInSide(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeIconDropdown
        size="medium"
        sx={{ position: "fixed", top: "1rem", right: "1rem" }}
      />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh", // Высота 100% окна просмотра
            width: "100%", // Ширина 100% доступного пространства
            margin: 0, // Убираем отступы
          },
          (theme) => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage:
                "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
              backgroundRepeat: "no-repeat",
              ...theme.applyStyles("dark", {
                backgroundImage:
                  "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}
