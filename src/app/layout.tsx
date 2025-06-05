import type { Metadata } from "next";
import { DeckProvider } from "./context/deckContext";

export const metadata: Metadata = {
  title: "Commander Generator",
  description: "I love Magic the Gathering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <DeckProvider>
          {children}
        </DeckProvider>
      </body>
    </html>
  );
}
