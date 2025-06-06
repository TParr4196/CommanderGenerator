// adapted from https://github.com/vercel/next.js/discussions/47547 and https://emotion.sh/docs/cache-provider

"use client";
import { DeckProvider } from "../context/deckContext";
import { ThemeProvider, CacheProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import createCache from '@emotion/cache';

import type { ReactNode } from "react";

const emotionCache = createCache({
  key: 'css',
  prepend: true,
});


export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={createTheme()}>
          <DeckProvider>
              {children}
          </DeckProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};