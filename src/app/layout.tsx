import "~/styles/globals.css";

import { type Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Solvro Cocktails",
  description: "Cocktails Solvro - wybierz swój ulubiony koktajl",
  icons: [{ rel: "icon", url: "/images/favicon.png" }],
};

const mainFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mainFont.variable} scroll-smooth`}>
      <body className={"bg-gradient-to-b from-dark to-b-dark"}>{children}</body>
    </html>
  );
}
