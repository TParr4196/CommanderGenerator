import type { Metadata } from "next";
import { AppWrapper } from "./context/muiWrapper";

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
      {/* got help from chatgpt with setting background color */}
      <body style={{ backgroundColor: 'lightblue' }}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
