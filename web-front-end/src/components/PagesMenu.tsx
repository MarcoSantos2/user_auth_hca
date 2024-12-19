import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { pages } from '../constants/sitePages';
import { useTheme } from '@mui/material/styles';

export default function PagesMenu() {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => (
        <Button
          variant="text"
          key={page.id}
          component={Link}
          href={page.to}
          sx={{ 
            m: 2, 
            display: 'block', 
            textTransform: 'none',
            color: theme.palette.text.primary
          }}
        >
          {page.text}
        </Button>
      ))}
    </Box>
  );
}
