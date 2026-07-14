import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box,
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";

export default function InteractionForm({
  form,
  handleChange,
  saveInteraction,
  editing,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 3,
        borderRadius: 4,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        📝 Log HCP Interaction
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Record and manage healthcare professional interactions.
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="HCP Name"
            name="hcp_name"
            value={form.hcp_name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Specialty"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Interaction Type"
            name="interaction_type"
            value={form.interaction_type}
            onChange={handleChange}
          >
            <MenuItem value="Visit">Visit</MenuItem>
            <MenuItem value="Call">Call</MenuItem>
            <MenuItem value="Video Meeting">
              Video Meeting
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Products Discussed"
            name="products"
            value={form.products}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} >
         <TextField
    fullWidth
    type="date"
    name="followup_date"
    value={form.followup_date}
    onChange={handleChange}
    helperText="Select the next follow-up date"
    InputLabelProps={{
        shrink: true,
    }}
/>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={5}
            label="Interaction Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={saveInteraction}
              sx={{
                px: 6,
                py: 1.5,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {editing
                ? "Update Interaction"
                : "Save Interaction"}
            </Button>
          </Box>
        </Grid>

      </Grid>
    </Paper>
  );
}