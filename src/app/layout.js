import { Playwrite_FR_Trad, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const cursive = Playwrite_FR_Trad({
  variable: "--playwrite",
  weight: "400",
  style: "normal",
  preload: true,
});

const digital = Zen_Maru_Gothic({
  variable: "--zen",
  subsets: ["latin"],
  weight: "900",
  style: "normal",
  preload: true,
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
