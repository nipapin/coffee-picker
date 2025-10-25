"use client";

import useHistory from "@/hooks/useHistory";
import { Close } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, LinearProgress, List, Typography } from "@mui/material";
import { useCallback } from "react";
import HistoryItem from "./HistoryItem";

export default function History() {
  const { history, isLoading, open, setOpen, toggleFavorite, deleteHistoryItem } = useHistory();

  const handleToggleFavorite = useCallback(
    (id, favorite) => {
      toggleFavorite(id, favorite);
    },
    [toggleFavorite]
  );

  const handleDelete = useCallback(
    (id) => {
      deleteHistoryItem(id);
    },
    [deleteHistoryItem]
  );

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        sx={{
          minWidth: 0,
          position: "absolute",
          top: "1rem",
          right: "1rem",
          aspectRatio: 1,
          borderRadius: "0.5rem",
          opacity: Number(!open),
          zIndex: Number(!open) * 10000,
          transition: "opacity 0.3s ease-in-out",
        }}
        onClick={() => setOpen(true)}
      >
        <ListIcon />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen slotProps={{ paper: { elevation: 0 } }}>
        <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">История</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        {open && isLoading && <LinearProgress sx={{ width: "100%" }} />}
        <DialogContent>
          <List>
            {history.map((item) => {
              return <HistoryItem key={item.id} item={item} onToggleFavorite={handleToggleFavorite} onDelete={handleDelete} />;
            })}
          </List>
          {!isLoading && history.length === 0 && <Typography variant="body1">Пора выпить кофе</Typography>}
        </DialogContent>
      </Dialog>
    </>
  );
}
