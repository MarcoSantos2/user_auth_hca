import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';
// import Link from '@mui/material/Link';

// import { pages } from '../constants/sitePages';

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegistrationMenu({isLoggedIn, setIsLoggedIn}: Props) {
  if (isLoggedIn) {
    return null
  }
  return (
    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
      <Button 
        color="primary" 
        variant="contained" 
        size="large" 
        onClick={() => setIsLoggedIn(true)}
        sx={{ m: 2}}
      >
        Log in
      </Button>
      <Button 
        color="primary" 
        variant="outlined" 
        size="large"
        sx={{ m: 2}}
      >
        Sign up
      </Button>
      <ColorModeIconDropdown />
  </Box>
  );
}
