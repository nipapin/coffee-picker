"use client";

import { useAppState } from "@/hooks/useAppState";
import { useDrinkStore } from "@/hooks/useDrink";
import { ArrowForward, FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Chip, Dialog, Divider, IconButton, Stack, Typography } from "@mui/material";

export default function DoneScreen() {
  const { isDone, setIsDone, setIsGenerating } = useAppState();
  const { base, milk, syrup } = useDrinkStore();

  const handleTryAgain = () => {
    setIsGenerating(false);
    setIsDone(false);
  };

  return (
    <Dialog open={isDone} onClose={() => setIsDone(false)} fullScreen slotProps={{ paper: { className: "done-screen-paper", elevation: 0 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography className="title">Я буду</Typography>
        <IconButton>
          <FavoriteBorder />
        </IconButton>
      </Stack>
      <Box className="done-screen-card">
        <Typography className="base">{base}</Typography>
        <Divider flexItem />
        <Box className="milk-wrapper">
          <Typography className="milk-title">Молоко</Typography>
          <Typography className="milk">{milk || "Без молока"}</Typography>
        </Box>
        <Divider flexItem />
        <Box className="syrup-wrapper">
          <Typography className="syrup-title">Сироп{syrup.length > 1 ? "ы" : ""}</Typography>
          <Box className="syrup-chips">
            {syrup.length > 0 ? (
              syrup.map((syr) => {
                return <Chip key={syr} label={syr} className="syrup-chip" />;
              })
            ) : (
              <Chip label={"Без сиропа"} className="syrup-chip" />
            )}
          </Box>
        </Box>
      </Box>
      <Button sx={{ mb: "2rem" }} endIcon={<ArrowForward />} fullWidth variant="contained" color="primary" onClick={handleTryAgain}>
        Попробовать еще раз
      </Button>
    </Dialog>
  );
}
