import { useState } from "react";
import api from "../services/api";

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  CircularProgress,
  Chip,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import SendIcon from "@mui/icons-material/Send";

export default function AIChat({ refreshInteractions }) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Find Dr Sharma",
    "Summarize Dr Sharma interactions",
    "Show pending follow-ups",
    "Show product insights",
  ];

  const sendMessage = async () => {
  if (!message.trim()) return;

  setLoading(true);

  try {
    const res = await api.post("/chat/", {
      message,
    });

    setResponse(res.data.response);

    // Refresh interaction table after AI response
    if (refreshInteractions) {
      await refreshInteractions();
    }

  } catch (err) {
    console.error(err);
    setResponse("Unable to contact AI assistant.");
  } finally {
    setLoading(false);
  }
};

  return (
    <Card
      elevation={5}
      sx={{
        mt: 3,
        borderRadius: 4,
      }}
    >
      <CardHeader
        avatar={<SmartToyIcon color="primary" />}
        title="AI Assistant"
        subheader="Ask questions about doctors, products, interactions and follow-ups."
      />

      <CardContent>

        <TextField
          fullWidth
          multiline
          rows={5}
          placeholder={`Examples:

• Find Dr Sharma

• Summarize Dr Sharma interactions

• Show pending follow-ups

• Show product insights`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {suggestions.map((item) => (
            <Chip
              key={item}
              label={item}
              clickable
              onClick={() => setMessage(item)}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={
            loading ? (
              <CircularProgress
                size={18}
                color="inherit"
              />
            ) : (
              <SendIcon />
            )
          }
          sx={{
            mt: 3,
            borderRadius: 3,
            px: 4,
          }}
          disabled={loading}
          onClick={sendMessage}
        >
          {loading
            ? "Analyzing..."
            : "Analyze with AI"}
        </Button>

        <Paper
          elevation={2}
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            background: "#fafafa",
            minHeight: 220,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            gutterBottom
          >
            🤖 AI Response
          </Typography>

          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              lineHeight: 1.8,
            }}
          >
            {response ||
              "Your AI analysis will appear here after submitting a query."}
          </Typography>
        </Paper>

      </CardContent>
    </Card>
  );
}