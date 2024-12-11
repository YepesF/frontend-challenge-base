import { Metadata } from "next";
import { Inter } from "next/font/google";
import MovileNavBar from "@/components/nav-bar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MovileNavBar />
        {children}
      </body>
    </html>
  );
}
