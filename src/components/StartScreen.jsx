"use client";

import { useAppState } from "@/hooks/useAppState";
import { useDrinkStore } from "@/hooks/useDrink";
import { AutoAwesome } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function StartScreen() {
  const { setIsGenerating } = useAppState();
  const { generateRandomCoffee } = useDrinkStore();
  return (
    <div className="start-screen">
      <Button
        variant="contained"
        color="primary"
        startIcon={<AutoAwesome />}
        fullWidth
        onClick={() => {
          setIsGenerating(true);
          generateRandomCoffee();
        }}
      >
        Довериться случаю
      </Button>
    </div>
  );
}
