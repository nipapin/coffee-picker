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
      <body>
        <AppRouterCacheProvider options={{ key: "coffee-picker" }}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
