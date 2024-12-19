import Grid from '@mui/material/Grid2';
import Header from './SiteHeader';
import Content from './SiteContent';
import Footer from './SiteFooter';
import SiteTheme from '../theme/SiteTheme';

export function SiteLayout(props: any) {
  return (
    <SiteTheme>
      <Grid container direction="column" sx={{ minHeight: '100vh' }}>
        <Grid>
          <Header />
        </Grid>
        <Grid flexGrow={1}>
          <Content {...props} />
        </Grid>
        <Grid>
          <Footer />
        </Grid>
      </Grid>
    </SiteTheme>
  );
}

export default SiteLayout;
