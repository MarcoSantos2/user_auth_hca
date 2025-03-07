import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router';

import ColorModeIconDropdown from './ColorModeIconDropdown';
import { useAuth } from '../context';

export default function LoggedUserMenu() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const settings = [
    {id: 'logged_user_profile_menu', title: 'Profile', onClick: () => {
      handleCloseUserMenu();
      navigate('/profile');
    }}, 
    {id: 'logged_user_account_menu', title: 'Account', onClick: () => {
      handleCloseUserMenu();
      navigate('/account');
    }}, 
    {id: 'logged_user_dashboard_menu', title: 'Dashboard', onClick: () => {
      handleCloseUserMenu();
      navigate('/dashboard');
    }}, 
    {id: 'logged_user_logout_menu', title: 'Logout', onClick: () => {
      handleCloseUserMenu();
      auth.logout();
      navigate('/');
    }}
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (!auth.isLogin()) {
    return null
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title={auth.name}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt={auth.name} src={auth.picture_url}>{auth.name.split(' ')[0][0]}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.id} id={setting.id} onClick={setting.onClick}>
            <Typography sx={{ textAlign: 'center' }}>{setting.title}</Typography>
          </MenuItem>
        ))}
        <Box sx={{ display: { xs: 'none', md: 'flex' }}}>
          <Divider />
          <ColorModeIconDropdown inSubMenu/>
        </Box>
      </Menu>
    </Box>
  );
}
