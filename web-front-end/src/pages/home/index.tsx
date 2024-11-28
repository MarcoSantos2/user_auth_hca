import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../../components/AppBar';
import AppTheme from '../../theme/AppTheme';
import { Container } from '@mui/material';

export function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppBar />
    </AppTheme>
  );
}

export default Home;
