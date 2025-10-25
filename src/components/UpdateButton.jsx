"use client";

import { Refresh } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function UpdateButton() {
  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <IconButton size="small" sx={{ position: "absolute", top: "1rem", left: "1rem" }} onClick={handleUpdate}>
      <Refresh />
    </IconButton>
  );
}
