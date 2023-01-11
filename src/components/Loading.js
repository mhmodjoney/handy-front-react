import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <Box className="loading">
      <CircularProgress size={100} color="inherit" />
    </Box>
  );
}
