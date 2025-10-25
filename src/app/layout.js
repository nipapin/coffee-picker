import ThemeWrapper from "../theme/ThemeWrapper";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata = {
  title: "Coffee Picker",
  description: "A coffee picker app",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap"
          loading="lazy"
        />
      </head>
      <body>
        <AppRouterCacheProvider options={{ key: "coffee-picker" }}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
