import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ColorModeIconDropdown from './ColorModeIconDropdown';
import Link from '@mui/material/Link';

export default function RegistrationMenu() {
  return (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <Button 
        color="primary" 
        variant="contained" 
        size="large"
        component={Link}
        href="/sign_in"
        sx={{ m: 2}}
      >
        Log in
      </Button>
      <Button 
        color="primary" 
        variant="outlined" 
        size="large"
        component={Link}
        href="/sign_up"
        sx={{ m: 2}}
      >
        Sign up
      </Button>
      <ColorModeIconDropdown />
  </Box>
  );
}
