import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

export default function StyledDivider({children}: any) {
  return (
    <Box sx={{ position: 'relative', py: 0 }}>
      <Divider>
        <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
          {children}
        </Typography>
      </Divider>
    </Box>
  );
}
