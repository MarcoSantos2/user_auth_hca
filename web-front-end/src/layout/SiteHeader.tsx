import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import DrawerSiteMenu from '../components/DrawerSiteMenu';
import Logo from '../components/Logo';
import PagesMenu from '../components/PagesMenu';
import RegistrationMenu from '../components/RegistrationMenu';
import LoggedUserMenu from '../components/LoggedUserMenu';
import { useAuth } from '../context';

function SiteHeader() {
  const auth = useAuth();

  return (
    <AppBar 
      position="static"
      sx={{bgcolor: 'transparent'}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DrawerSiteMenu />
          <Logo />
          <PagesMenu />
          {auth.isLogin() ? <LoggedUserMenu /> : <RegistrationMenu />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default SiteHeader;
