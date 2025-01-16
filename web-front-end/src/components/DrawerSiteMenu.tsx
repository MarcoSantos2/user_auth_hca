import { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';

import { pages } from '../constants/sitePages';
import ColorModeIconDropdown from './ColorModeIconDropdown';

export default function DrawerSiteMenu() {
  const [anchorElNav, setAnchorElNav] =useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.id} component={Link} href={page.to}>
                  <Typography sx={{ textAlign: 'center' }}>{page.text}</Typography>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem key={'login'} component={Link} href={'/sign_in'}>
                <Typography sx={{ textAlign: 'center' }}>Login</Typography>
              </MenuItem>
              <MenuItem key={'sign-up'} component={Link} href={'/sign_up'}>
                <Typography sx={{ textAlign: 'center' }}>Sign Up</Typography>
              </MenuItem>
              <Divider />
              <MenuItem key={'mode-selection'} sx={{ p: 0 }}>
                <ColorModeIconDropdown inSubMenu/>
              </MenuItem>
            </Menu>
          </Box>
  );
}
