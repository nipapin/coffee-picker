"use client";

import { useAppState } from "@/hooks/useAppState";
import { useDrinkStore } from "@/hooks/useDrink";
import { AutoAwesome } from "@mui/icons-material";
import { Button, Grow, Slide, Typography, Zoom } from "@mui/material";

import packageJson from "../../package.json";

export default function StartScreen() {
  const { setIsGenerating } = useAppState();
  const { generateRandomCoffee, saveOrder } = useDrinkStore();
  return (
    <div className="start-screen">
      <Zoom in={true} mountOnEnter unmountOnExit>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AutoAwesome />}
          fullWidth
          onClick={() => {
            setIsGenerating(true);
            const variant = generateRandomCoffee();
            saveOrder(variant);
          }}
          sx={{ aspectRatio: 1, borderRadius: "50%" }}
        >
          <Typography>Довериться случаю</Typography>
        </Button>
      </Zoom>
      <Slide direction="up" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Typography sx={{ fontSize: "0.75rem", mt: "1rem", fontWeight: 200 }}>version {packageJson.version}</Typography>
      </Slide>
    </div>
  );
}
