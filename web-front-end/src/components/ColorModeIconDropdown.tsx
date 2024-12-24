import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SxProps, useColorScheme } from '@mui/material/styles';

interface Props {
  inSubMenu?: boolean
}
export default function ColorModeIconDropdown({inSubMenu}: Props) {
  const { mode, systemMode, setMode } = useColorScheme();

  const btSx: SxProps = { backgroundColor: 'transparent'};
  if (inSubMenu) {
    btSx.width = '100%';
  }
  const handleClick = () => {
    const resolvedMode = (systemMode || mode) as 'light' | 'dark';
    setMode(resolvedMode === 'light' ? 'dark' : 'light');
  };

  if (!mode) {
    return null;
  }
  const resolvedMode = (systemMode || mode) as 'light' | 'dark';
  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];

  return (
      <Button 
        variant="text" 
        data-screenshot="toggle-mode"
        size={'large'}
        onClick={handleClick}
        sx={btSx}
        disableRipple
      >
        {icon}
        <Typography variant="body2" ml={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
          {resolvedMode === 'light' ? 'Light' : 'Dark'}
        </Typography>
      </Button>
  );
}
