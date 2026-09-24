import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Knight Tour Visualizer",
  description: "Visualize a knight's tour on a chessboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
