import { Close, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import { memo, useState } from "react";

const getHumanReadableDate = (date) => {
  return new Date(date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const HistoryItem = memo(({ item, onToggleFavorite, onDelete }) => {
  const [favorite, setFavorite] = useState(item.favorite);

  const handleFavorite = () => {
    setFavorite(!favorite);
    onToggleFavorite(item.id, !favorite);
  };

  const handleDelete = () => {
    onDelete(item.id);
  };

  return (
    <ListItem
      disablePadding
      divider
      secondaryAction={
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconButton onClick={handleFavorite}>{favorite ? <Favorite /> : <FavoriteBorder />}</IconButton>
          <IconButton onClick={handleDelete}>
            <Close />
          </IconButton>
        </Box>
      }
      sx={{
        py: "1rem",
        "& .MuiListItemSecondaryAction-root": {
          right: "0",
        },
      }}
    >
      <ListItemText
        primary={`[${getHumanReadableDate(item.createdAt)}] ${item.base}`}
        secondary={[`Молоко: ${item.milk}`, `Сироп: ${item.syrup}`].filter(Boolean).join("\n")}
        slotProps={{ secondary: { sx: { width: "80%", whiteSpace: "pre-line" } } }}
      />
    </ListItem>
  );
});

export default HistoryItem;
