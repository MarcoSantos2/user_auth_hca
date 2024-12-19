import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../components/TopMenuBar';
import AppTheme from '../theme/AppTheme';

export function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppBar />
    </AppTheme>
  );
}

export default Home;
