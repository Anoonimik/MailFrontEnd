import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import HomeIcon from "@mui/icons-material/Home";
import OptionsMenu from "../dashboard/components/OptionsMenu.tsx";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/authSlice";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const handleRedirect = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const AuthButtons = () => {
    const user = useSelector(selectUser);
    console.log(user);
    if (isAuthenticated) {
      return (
        <Stack
          direction="row"
          sx={{
            p: 1,
            gap: 1,
            alignItems: "center",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="small"
            alt={user?.nickname || ""}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {user?.nickname || "No name"}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {user?.email || "No email"}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>

        /*        <Button
          color="primary"
          variant="outlined"
          size="small"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>*/
      );
    }
    return (
      <>
        <Button
          color="primary"
          variant="text"
          size="small"
          onClick={handleRedirect}
        >
          Sign in
        </Button>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={handleRegister}
        >
          Sign up
        </Button>
      </>
    );
  };

  const MobileAuthButtons = () => {
    const user = useSelector(selectUser);
    if (isAuthenticated) {
      return (
        <Stack
          direction="row"
          sx={{
            p: 1,
            gap: 1,
            alignItems: "center",
            borderColor: "divider",
          }}
        >
          <Avatar
            sizes="small"
            alt={user?.nickname || ""}
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: "auto" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, lineHeight: "16px" }}
            >
              {user?.nickname || "No name"}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              console.log(user?.email);
              {user?.email || "No email"}
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
        /*<MenuItem>
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </MenuItem>*/
      );
    }
    return (
      <>
        <MenuItem>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={handleRegister}
          >
            Sign up
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            color="primary"
            variant="outlined"
            fullWidth
            onClick={handleRedirect}
          >
            Sign in
          </Button>
        </MenuItem>
      </>
    );
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <IconButton onClick={() => navigate("/")}>
              <HomeIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" color="info" size="small">
                Features
              </Button>
              <Button variant="text" color="info" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small">
                Highlights
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                FAQ
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <AuthButtons />
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MobileAuthButtons />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
