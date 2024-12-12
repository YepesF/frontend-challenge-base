import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://frontend-challenge-base-three.vercel.app"),
  title: "Quickbet Movies",
  description:
    "This platform allows users to explore a wide selection of movies, view detailed information about each title, and save their favorites to a personalized list. With an intuitive and user-friendly interface, users can easily search for specific movies, browse popular selections, and discover new favorites to enjoy. Designed with accessibility in mind, the platform provides a seamless experience for movie lovers on any device.",
  openGraph: {
    title: "Quickbet Movies",
    description:
      "This platform allows users to explore a wide selection of movies, view detailed information about each title, and save their favorites to a personalized list. With an intuitive and user-friendly interface, users can easily search for specific movies, browse popular selections, and discover new favorites to enjoy. Designed with accessibility in mind, the platform provides a seamless experience for movie lovers on any device.",
    images: "https://frontend-challenge-base-three.vercel.app/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
