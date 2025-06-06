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
      <body>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
