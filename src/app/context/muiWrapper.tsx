// adapted from https://github.com/vercel/next.js/discussions/47547

"use client";
import { DeckProvider } from "../context/deckContext";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import type { ReactNode } from "react";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={createTheme}>
        <DeckProvider>
            {children}
        </DeckProvider>
    </ThemeProvider>
  );
};