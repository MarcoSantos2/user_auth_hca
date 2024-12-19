import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Logo from './Logo';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function TopMenuBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
      }}
    >
      <StyledToolbar variant="dense" disableGutters>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
          <Logo />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button size="small">
              Health Providers
            </Button>
            <Button size="small">
              Care Givers
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Button color="primary" variant="outlined" size="small">
            Log in
          </Button>
          <Button color="secondary" variant="contained" size="small">
            Sign up
          </Button>
          <ColorModeIconDropdown />
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
          <ColorModeIconDropdown />
          <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                top: 'var(--template-frame-height, 0px)',
              },
            }}
          >
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>

              <MenuItem>Health Providers</MenuItem>
              <MenuItem>Testimonials</MenuItem>
              <Divider sx={{ my: 3 }} />
              <MenuItem>
                <Button color="secondary" variant="contained" fullWidth>
                  Sign up
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="primary" variant="outlined" fullWidth>
                  Log in
                </Button>
              </MenuItem>
            </Box>
          </Drawer>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}
