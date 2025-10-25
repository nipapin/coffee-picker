"use client";

import { useAppState } from "@/hooks/useAppState";
import { Box, CircularProgress, Drawer, Slide, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Pattern from "./Pattern";

export default function GeneratingScreen() {
  const { isGenerating, setIsGenerating, setIsDone } = useAppState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isGenerating) return;

    const randomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    let timeout = null;
    const step = randomInt(50, 150);
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 10, 100));
      if (progress === 100) {
        setProgress(100);
        clearInterval(interval);
        setIsDone(true);
        timeout = setTimeout(() => {
          setIsGenerating(false);
          setProgress(0);
        }, 1000);
      }
    }, step);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [progress, isGenerating]);

  return (
    <Drawer
      className="generating-screen"
      anchor="bottom"
      open={isGenerating}
      onClose={() => setIsGenerating(false)}
      slotProps={{ paper: { className: "generating-screen-paper", elevation: 0 } }}
    >
      <Slide direction="up" in={isGenerating} mountOnEnter unmountOnExit>
        <Typography variant="h6">Генерируем ваш кофе</Typography>
      </Slide>
      <Pattern />
      <Box className="generating-screen-progress-wrapper">
        <CircularProgress variant="determinate" value={progress} size={150} thickness={5} />
      </Box>
    </Drawer>
  );
}
