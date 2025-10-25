"use client";

import useHistory from "@/hooks/useHistory";
import { Close } from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Skeleton,
  Typography
} from "@mui/material";
import { useCallback } from "react";
import HistoryItem from "./HistoryItem";

const skeletons = Array.from({ length: 3 }, (_, index) => index);

export default function History() {
  const { history, isLoading, open, setOpen, toggleFavorite, deleteHistoryItem, removeOrders } = useHistory();

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

  const removeAllOrders = useCallback(() => {
    removeOrders();
  }, [removeOrders]);

  return (
    <>
      <IconButton
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
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen slotProps={{ paper: { elevation: 0 } }}>
        <DialogTitle component="div" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">История</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {isLoading
              ? skeletons.map((skeleton, index) => {
                  return (
                    <ListItem key={index} disablePadding>
                      <Skeleton
                        variant="rounded"
                        height={100}
                        width="100%"
                        sx={{ mb: "0.5rem", "&:after": { animationDelay: `${index * 100}ms` } }}
                        animation="wave"
                      />
                    </ListItem>
                  );
                })
              : history.map((item) => {
                  return (
                    <HistoryItem
                      key={item.id}
                      item={item}
                      onToggleFavorite={handleToggleFavorite}
                      onDelete={handleDelete}
                    />
                  );
                })}
            <ListItem disablePadding>
              {!isLoading && history.length === 0 && <Typography variant="body1">Пора выпить кофе</Typography>}
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ pb: "2rem" }}>
          <Button variant="contained" color="primary" onClick={removeAllOrders} fullWidth>
            Удалить все
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
