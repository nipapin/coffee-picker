"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeOptions } from "@/theme/themeOptions";
import { CssBaseline } from "@mui/material";

const theme = createTheme(themeOptions);

export default function ThemeWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
