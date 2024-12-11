import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/home-page/AppAppBar.tsx";
import Hero from "../../components/home-page/Hero.tsx";
import Highlights from "../../components/home-page/Highlights.tsx";
import Pricing from "../../components/home-page/Pricing.tsx";
import Features from "../../components/home-page/Features.tsx";
import FAQ from "../../components/home-page/FAQ.tsx";
import Footer from "../../components/home-page/Footer.tsx";
import AppTheme from "../../shared-theme/AppTheme";

export default function HomePage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <Divider />
        <Features />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
