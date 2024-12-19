import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import DrawerSiteMenu from '../components/DrawerSiteMenu';
import Logo from '../components/Logo';
import PagesMenu from '../components/PagesMenu';
import RegistrationMenu from '../components/RegistrationMenu';
import LoggedUserMenu from '../components/LoggedUserMenu';

function SiteHeader() {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  return (
    <AppBar 
      position="static"
      sx={{bgcolor: 'transparent'}}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DrawerSiteMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Logo />
          <PagesMenu />
          <RegistrationMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <LoggedUserMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default SiteHeader;
