"use client";

import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Carousel({ options, selected, isGenerating }) {
  const [shuffledOptions, setShuffledOptions] = useState(options);
  const boxRef = useRef(null);
  useEffect(() => {
    setShuffledOptions(options.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (!boxRef.current) return;
    if (isGenerating) {
      boxRef.current.scrollTo({
        top: 0,
        behavior: "instant",
      });
      const selectedText = selected === "" ? options[0] : selected;
      const childIndex = [...boxRef.current.children].findIndex(
        (child) => child.textContent === selectedText
      );
      const scrollTop = boxRef.current.children[childIndex + options.length - 1].offsetTop;
      boxRef.current.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  }, [isGenerating, selected, options]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        my: "auto",
        position: "relative",
        padding: "1px",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(0deg, #1e1e1e 0%, transparent 50%, #1e1e1e 100%)",
          transform: "scale(1.1)",
        },
      }}
    >
      <Box
        ref={boxRef}
        sx={{
          display: "flex",
          gap: "12px",
          flexDirection: "column",
          height: "100px",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {[...shuffledOptions, ...shuffledOptions, ...shuffledOptions].map((option, index) => (
          <Typography key={`${option}-${index}`} textAlign={"center"}>
            {option}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
