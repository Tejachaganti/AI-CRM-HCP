import {
  Grid,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import {
  People,
  Assignment,
  Event,
  Medication,
} from "@mui/icons-material";

export default function DashboardCards({
  interactions = [],
}) {
  const totalInteractions = interactions.length;

  const doctors = new Set(
    interactions.map((i) => i.hcp_name)
  ).size;

  const pendingFollowups =
    interactions.filter(
      (i) => i.followup_date
    ).length;

  const productCount = {};

  interactions.forEach((i) => {
    if (!i.products) return;

    productCount[i.products] =
      (productCount[i.products] || 0) + 1;
  });

  let topProduct = "-";

  if (Object.keys(productCount).length > 0) {
    topProduct = Object.keys(productCount).reduce(
      (a, b) =>
        productCount[a] > productCount[b]
          ? a
          : b
    );
  }

  const cards = [
    {
      title: "Doctors",
      value: doctors,
      subtitle: "Registered HCPs",
      icon: <People sx={{ fontSize: 44 }} color="primary" />,
    },
    {
      title: "Interactions",
      value: totalInteractions,
      subtitle: "Recorded Visits",
      icon: (
        <Assignment
          sx={{ fontSize: 44 }}
          color="success"
        />
      ),
    },
    {
      title: "Follow-ups",
      value: pendingFollowups,
      subtitle: "Upcoming Tasks",
      icon: (
        <Event
          sx={{ fontSize: 44 }}
          color="warning"
        />
      ),
    },
    {
      title: "Top Product",
      value: topProduct,
      subtitle: "Most Discussed",
      icon: (
        <Medication
          sx={{ fontSize: 44 }}
          color="error"
        />
      ),
    },
  ];

 return (
  <Grid container spacing={3} sx={{ mb: 4 }}>
    {cards.map((card) => (
      <Grid item xs={12} sm={6} lg={3} key={card.title}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            minHeight: 180,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all .25s ease",

            "&:hover": {
              transform: "translateY(-6px)",
              boxShadow: 10,
            },
          }}
        >
          {/* Top Row */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="text.secondary"
            >
              {card.title}
            </Typography>

            {card.icon}
          </Box>

          {/* Middle */}
          <Box sx={{ my: 2 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {card.value}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {card.subtitle}
            </Typography>
          </Box>

          {/* Bottom Accent */}
          <Box
            sx={{
              width: 50,
              height: 4,
              borderRadius: 10,
              bgcolor: "primary.main",
            }}
          />
        </Paper>
      </Grid>
    ))}
  </Grid>
);
}