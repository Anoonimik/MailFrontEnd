import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useColorScheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import Box from "@mui/material/Box";

interface ColorModeSelectProps {
  sx?: SxProps;
}

export default function ColorModeSelect({ sx }: ColorModeSelectProps) {
  const { mode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (mode: "system" | "light" | "dark") => {
    setMode(mode);
    handleClose();
  };

  if (!mode) {
    return null;
  }

  return (
    <Box sx={sx}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: 1,
          borderColor: mode === "light" ? "black" : "white",
        }}
      >
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("system")}>
          System
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("light")}>Light</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("dark")}>Dark</MenuItem>
      </Menu>
    </Box>
  );
}
