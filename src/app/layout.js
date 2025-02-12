import { Playwrite_FR_Trad, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const cursive = Playwrite_FR_Trad({
  variable: "--playwrite",
  style: "normal",
});

const digital = Chakra_Petch({
  variable: "--chakra",
  subsets: ["latin"],
  weight: "700",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cursive.variable}  ${digital.variable}  antialiased`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
