import { Playwrite_FR_Trad } from "next/font/google";
import "./globals.css";

const cursive = Playwrite_FR_Trad({
  variable: "--playwrite",
  style: "normal",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cursive.variable} antialiased`}>{children}</body>
    </html>
  );
}
