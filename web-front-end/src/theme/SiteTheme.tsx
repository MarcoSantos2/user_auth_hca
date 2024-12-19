import {useMemo} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface SiteThemeProps {
  children: React.ReactNode
}

export default function SiteTheme({children}: SiteThemeProps) {
  const theme = useMemo(() => {
    return createTheme({
      colorSchemes: {
        light: true,
        dark: true,
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
