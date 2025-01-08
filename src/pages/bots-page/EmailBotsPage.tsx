import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Container,
  Grid,
  TextField,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppTheme from "../../shared-theme/AppTheme.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const EmailBotsPage = (props: { disableCustomTheme?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    smtpPort: "",
    smtpHost: "",
    imapPort: "",
    imapHost: "",
  });
  const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "450px",
    },
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
      boxShadow:
        "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
  }));
  // Пример данных, замените на реальные данные из API
  const [bots, setBots] = useState([
    {
      id: 1,
      email: "bot1@example.com",
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      imapHost: "imap.example.com",
      imapPort: 993,
    },
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...formData,
      smtpPort: Number(formData.smtpPort),
      imapPort: Number(formData.imapPort),
    };

    try {
      // API запрос
      console.log("Form data:", payload);
      setOpen(false);
      // После успешного создания обновите список ботов
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Container maxWidth="lg">
        <Box
          sx={(theme) => ({
            py: { xs: 8 },
            backgroundRepeat: "no-repeat",
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
            ...theme.applyStyles("dark", {
              backgroundImage:
                "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
            }),
          })}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">Email Bots</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
            >
              Add New Bot
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>SMTP Host</TableCell>
                  <TableCell>SMTP Port</TableCell>
                  <TableCell>IMAP Host</TableCell>
                  <TableCell>IMAP Port</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bots.map((bot) => (
                  <TableRow key={bot.id}>
                    <TableCell>{bot.email}</TableCell>
                    <TableCell>{bot.smtpHost}</TableCell>
                    <TableCell>{bot.smtpPort}</TableCell>
                    <TableCell>{bot.imapHost}</TableCell>
                    <TableCell>{bot.imapPort}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Dialog для создания нового бота */}
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
          PaperComponent={Card}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Create Email Bot
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="• • • • • •"
                required
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <FormLabel htmlFor="smtpHost">SMTP Host</FormLabel>
                <TextField
                  id="smtpHost"
                  name="smtpHost"
                  placeholder="smtp.example.com"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.smtpHost}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="smtpPort">SMTP Port</FormLabel>
                <TextField
                  id="smtpPort"
                  name="smtpPort"
                  type="number"
                  placeholder="587"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.smtpPort}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <FormControl fullWidth>
                <FormLabel htmlFor="imapHost">IMAP Host</FormLabel>
                <TextField
                  id="imapHost"
                  name="imapHost"
                  placeholder="imap.example.com"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.imapHost}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl fullWidth>
                <FormLabel htmlFor="imapPort">IMAP Port</FormLabel>
                <TextField
                  id="imapPort"
                  name="imapPort"
                  type="number"
                  placeholder="993"
                  required
                  fullWidth
                  variant="outlined"
                  value={formData.imapPort}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Create Bot
            </Button>
          </Box>
        </Dialog>
      </Container>
    </AppTheme>
  );
};

export default EmailBotsPage;
