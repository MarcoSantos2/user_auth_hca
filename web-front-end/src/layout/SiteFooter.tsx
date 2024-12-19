import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {/*© 2024 Your Company Name. All rights reserved.*/}
      </Typography>
    </Box>
  );
}
