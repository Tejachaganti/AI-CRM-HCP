import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Alert,
} from "@mui/material";

import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import InteractionForm from "../components/InteractionForm";
import InteractionTable from "../components/InteractionTable";
import AIChat from "../components/AIChat";


import { useDispatch, useSelector } from "react-redux";

import {
  setInteractions,
} from "../redux/interactionSlice";

import api from "../services/api";

export default function Dashboard() {
  const [tab, setTab] = useState(0);

  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();

const interactions = useSelector(
  (state) => state.interactions.data
);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    hcp_name: "",
    specialty: "",
    interaction_type: "",
    products: "",
    notes: "",
    followup_date: "",
  });
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const loadInteractions = async () => {
  try {
    const res = await api.get("/interaction/");
     console.log("API Response:", res.data);
    dispatch(setInteractions(res.data));
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  loadInteractions();
}, []);
const saveInteraction = async () => {
  try {
    if (editingId) {
      await api.put(`/interaction/${editingId}`, form);

      setSuccess("Interaction Updated Successfully!");
    } else {
      await api.post("/interaction/", form);

      setSuccess("Interaction Saved Successfully!");
    }

    await loadInteractions();

    setForm({
      hcp_name: "",
      specialty: "",
      interaction_type: "",
      products: "",
      notes: "",
      followup_date: "",
    });

    setEditingId(null);

    setTimeout(() => {
      setSuccess("");
    }, 3000);

  } catch (err) {
    console.error(err);

    if (err.response) {
      alert(JSON.stringify(err.response.data));
    } else {
      alert("Operation failed.");
    }
  }
};

const editInteraction = (item) => {
  setEditingId(item.id);

  setForm({
    hcp_name: item.hcp_name || "",
    specialty: item.specialty || "",
    interaction_type: item.interaction_type || "",
    products: item.products || "",
    notes: item.notes || "",
    followup_date: item.followup_date || "",
  });
};
return (
  <Box
    sx={{
      minHeight: "100vh",
      background: "#f4f7fb",
      py: 4,
    }}
  >
    <Container maxWidth="lg">

      <Navbar />

     <Typography
    variant="h4"
    fontWeight="bold"
>
    Welcome Back 👋
</Typography>

<Typography color="text.secondary">
Manage healthcare professional interactions with AI assistance.
</Typography>

     <DashboardCards interactions={interactions} />


      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
        >
          {success}
        </Alert>
      )}

      <Paper
        elevation={3}
        sx={{
          mt: 3,
          p: 3,
          borderRadius: 3,
        }}
      >
       <Tabs
  value={tab}
  onChange={(e, v) => setTab(v)}
  sx={{
    mb: 3,

    "& .MuiTabs-indicator": {
      display: "none",
    },

    "& .MuiTab-root": {
      textTransform: "none",
      fontWeight: 600,
      borderRadius: "30px",
      px: 3,
      py: 1,
      minHeight: 42,
      transition: "0.3s",
      color: "#555",
      mx: 0.5,
    },

    "& .Mui-selected": {
      background: "#1976d2",
      color: "#fff !important",
      boxShadow: "0 4px 10px rgba(25,118,210,.3)",
    },
  }}
>
  <Tab label="📝 Structured Form" />
  <Tab label="🤖 AI Assistant" />
</Tabs>

        {tab === 0 && (
          <>
            <InteractionForm
              form={form}
              handleChange={handleChange}
              saveInteraction={saveInteraction}
              editing={editingId !== null}
            />

            <>
  <Typography color="red" sx={{ mt: 2 }}>
    Total Interactions: {interactions.length}
  </Typography>

  <InteractionTable
    interactions={interactions}
    editInteraction={editInteraction}
  />
</>
          </>
        )}

        {tab === 1 && (
  <AIChat refreshInteractions={loadInteractions} />
)}
      </Paper>

    </Container>
  </Box>
);
}