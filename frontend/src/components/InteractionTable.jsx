import { useState } from "react";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  TextField,
  Chip,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

export default function InteractionTable({
  interactions = [],
  editInteraction,
}) {
  const [search, setSearch] = useState("");

  const filtered = interactions.filter((item) =>
    (
      item.hcp_name +
      item.specialty +
      item.products
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const chipColor = (type) => {
    switch (type) {
      case "Visit":
        return "primary";
      case "Call":
        return "success";
      case "Video Meeting":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2 }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
        >
          📋 Saved Interactions
        </Typography>

        <TextField
          size="small"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: "gray",
                }}
              />
            ),
          }}
        />
      </Stack>

      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader>

          <TableHead>
            <TableRow>

              <TableCell><b>ID</b></TableCell>

              <TableCell><b>Doctor</b></TableCell>

              <TableCell><b>Specialty</b></TableCell>

              <TableCell><b>Type</b></TableCell>

              <TableCell><b>Product</b></TableCell>

              <TableCell><b>Follow-up</b></TableCell>

              <TableCell align="center">
                <b>Action</b>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                >
                  No interactions found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                >
                  <TableCell>
                    {item.id}
                  </TableCell>

                  <TableCell>
                    {item.hcp_name}
                  </TableCell>

                  <TableCell>
                    {item.specialty}
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        item.interaction_type
                      }
                      color={chipColor(
                        item.interaction_type
                      )}
                    />
                  </TableCell>

                  <TableCell>
                    {item.products}
                  </TableCell>

                  <TableCell>
                    {item.followup_date}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() =>
                        editInteraction(item)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}

          </TableBody>

        </Table>
      </TableContainer>
    </Paper>
  );
}