import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../../shared-theme/AppTheme";
import RegisterBar from "../../../components/register-page/RegisterBar";
import {
  registerUser,
  resetRegistration,
  selectRegistrationLoading,
  selectRegistrationError,
  selectRegistrationSuccess,
} from "../../../store/slices/registrationSlice";

import { AppDispatch, RootState } from "../../../store";
import { registrationService } from "../../../services/registrationService.ts";

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

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
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
}));

interface SignUpProps {
  disableCustomTheme?: boolean;
}

interface FormErrors {
  company: { error: boolean; message: string };
  email: { error: boolean; message: string };
  password: { error: boolean; message: string };
  confirmPassword: { error: boolean; message: string };
}

export default function SignUp({ disableCustomTheme }: SignUpProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const formRef = React.useRef<HTMLFormElement>(null);

  const loading = useSelector((state: RootState) =>
    selectRegistrationLoading(state),
  );
  const error = useSelector((state: RootState) =>
    selectRegistrationError(state),
  );
  const success = useSelector((state: RootState) =>
    selectRegistrationSuccess(state),
  );

  const [formErrors, setFormErrors] = React.useState<FormErrors>({
    company: { error: false, message: "" },
    email: { error: false, message: "" },
    password: { error: false, message: "" },
    confirmPassword: { error: false, message: "" },
  });

  const [rememberMe, setRememberMe] = React.useState(false);

  // Reset form after successful registration
  React.useEffect(() => {
    if (success) {
      formRef.current?.reset();
      dispatch(resetRegistration());
      navigate("/login");
    }
  }, [success, navigate, dispatch]);

  const validateForm = (formData: FormData): boolean => {
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const newErrors = {
      company: { error: false, message: "" },
      email: { error: false, message: "" },
      password: { error: false, message: "" },
      confirmPassword: { error: false, message: "" },
    };

    let isValid = true;

    if (!company?.trim()) {
      newErrors.company = {
        error: true,
        message: "Company name is required.",
      };
      isValid = false;
    }

    if (!email?.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = {
        error: true,
        message: "Please enter a valid email address.",
      };
      isValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = {
        error: true,
        message: "Password must be at least 6 characters long.",
      };
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = {
        error: true,
        message: "Passwords do not match.",
      };
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!validateForm(formData)) {
      return;
    }

    const userData = {
      email: (formData.get("email") as string).trim(),
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      companyName: (formData.get("company") as string).trim(),
    };

    if (rememberMe) {
      registrationService.saveUserPreferences(
        userData.email,
        userData.companyName,
      );
    } else {
      registrationService.clearUserPreferences();
    }

    dispatch(registerUser(userData));
  };

  // Load remembered data
  React.useEffect(() => {
    const { email: rememberedEmail, companyName: rememberedCompany } =
      registrationService.getUserPreferences();

    if (rememberedEmail || rememberedCompany) {
      setRememberMe(true);
      if (formRef.current) {
        const elements = formRef.current.elements as any;
        if (rememberedEmail) elements.email.value = rememberedEmail;
        if (rememberedCompany) elements.company.value = rememberedCompany;
      }
    }
  }, []);

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <RegisterBar />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>

          {error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="company">Company</FormLabel>
              <TextField
                error={formErrors.company.error}
                helperText={formErrors.company.message}
                id="company"
                name="company"
                placeholder="Enter your company name"
                autoComplete="organization"
                required
                fullWidth
                variant="outlined"
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={formErrors.email.error}
                helperText={formErrors.email.message}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
                variant="outlined"
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={formErrors.password.error}
                helperText={formErrors.password.message}
                name="password"
                placeholder="• • • • • •"
                type="password"
                id="password"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                disabled={loading}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                error={formErrors.confirmPassword.error}
                helperText={formErrors.confirmPassword.message}
                name="confirmPassword"
                placeholder="• • • • • •"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                disabled={loading}
              />
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                  disabled={loading}
                />
              }
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </Box>

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/login" variant="body2" sx={{ alignSelf: "center" }}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
