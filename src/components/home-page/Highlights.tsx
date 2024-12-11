import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import SettingsSuggestRoundedIcon from "@mui/icons-material/SettingsSuggestRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: "Adaptable Performance",
    description:
      "Our app seamlessly adapts to your needs, enhancing efficiency and streamlining your workflows.",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Built to Last",
    description:
      "Experience unparalleled reliability, providing a long-lasting investment for your support team.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Great User Experience",
    description:
      "Easily integrate our app into your routine with an intuitive and user-friendly interface.",
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: "Innovative Functionality",
    description:
      "Stay ahead with features that set new standards, better addressing the evolving needs of your support team.",
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: "Reliable Support",
    description:
      "Count on our responsive customer support that goes beyond the purchase, ensuring continuous assistance.",
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: "Precision in Every Detail",
    description:
      "Enjoy a meticulously crafted app where every detail contributes to an exceptional overall experience.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={(theme) => ({
        py: { xs: 8 },
        backgroundRepeat: "no-repeat",
        backgroundImage: "white",
        ...theme.applyStyles("dark", {
          backgroundImage: "dark",
        }),
      })}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: "100%", md: "60%" },
            textAlign: { sm: "left", md: "center" },
          }}
        >
          <Typography component="h2" variant="h4" gutterBottom>
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer
            support and precision in every detail.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={1}
                useFlexGap
                sx={(theme) => ({
                  p: 3,
                  height: "100%",
                  borderColor: "dark",
                  color: "black",
                  ...theme.applyStyles("dark", {
                    color: "hsl(0, 0%, 100%)",
                  }),
                })}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: "medium" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
