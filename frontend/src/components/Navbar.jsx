import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        borderRadius: 3,
        mb: 4,
        background:
          "linear-gradient(90deg,#1565C0,#42A5F5)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            🤖 AI CRM - HCP Module
          </Typography>

          <Typography
            variant="body2"
            sx={{ opacity: 0.9 }}
          >
            AI-Powered Pharmaceutical CRM
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          gap={2}
        >
          <SmartToyIcon />

          <Box textAlign="right">
            <Typography fontWeight="bold">
              Medical Representative
            </Typography>

            <Typography variant="body2">
              AI Assistant Enabled
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: "white",
              color: "#1565C0",
              fontWeight: "bold",
            }}
          >
            M
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}