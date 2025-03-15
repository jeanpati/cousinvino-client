import { Playwrite_FR_Trad, Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const cursive = Playwrite_FR_Trad({
  variable: "--playwrite",
  weight: "400",
  style: "normal",
  preload: true,
  display: "swap",
});

const digital = Zen_Maru_Gothic({
  variable: "--zen",
  subsets: ["latin"],
  weight: "900",
  style: "normal",
  preload: true,
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Cousin Vino&apos;s drink calculator</title>
        <meta property="og:title" content="Cousin Vino's Drink Calculator" />
        <meta
          property="og:description"
          content="Easily calculate how many drinks to buy for your event with Cousin Vino's drink calculator. Perfect for parties, weddings, and gatherings!"
        />
        <meta property="og:image" content="/images/champagne-1920px.webp" />
        <meta property="og:url" content="https://www.cousinvino.com" />
        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="drink calculator, event drink calculator, how many drinks to buy, party drinks, wedding drink calculator, drink planning, party planning"
        />
      </Head>
      <body
        className={`${cursive.variable}  ${digital.variable} grid place-items-center`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
