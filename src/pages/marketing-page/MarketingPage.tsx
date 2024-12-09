import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppAppBar from "../../components/marketing-page/AppAppBar.tsx";
import Hero from "../../components/marketing-page/Hero.tsx";
import LogoCollection from "../../components/marketing-page/LogoCollection.tsx";
import Highlights from "../../components/marketing-page/Highlights.tsx";
import Pricing from "../../components/marketing-page/Pricing.tsx";
import Features from "../../components/marketing-page/Features.tsx";
import Testimonials from "../../components/marketing-page/Testimonials.tsx";
import FAQ from "../../components/marketing-page/FAQ.tsx";
import Footer from "../../components/marketing-page/Footer.tsx";
import AppTheme from "../../shared-theme/AppTheme";

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
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
