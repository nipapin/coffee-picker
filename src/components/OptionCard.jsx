import { Divider, Paper, Typography } from "@mui/material";
import Carousel from "./Carousel";

export default function OptionCard({ item }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        height: "100%",
        p: "1rem",
        alignItems: "center",
        borderRadius: "1rem",
        backgroundColor: "transparent",
      }}
    >
      <Divider textAlign="center" sx={{ width: "100%" }}>
        <Typography variant="body1" textTransform={"uppercase"}>
          {item.title}
        </Typography>
      </Divider>
      <Carousel options={item.options} selected={item.selected} isGenerating={item.isGenerating} />
    </Paper>
  );
}
