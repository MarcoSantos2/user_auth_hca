import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

interface Props {
  children?: React.ReactNode,
  onSubmit?: (event: React.FormEvent<any>) => void
}

export default function StyledForm({children, onSubmit}: Props) {
  return (
    <CardContent sx={{ paddingX: 2, paddingY: 0 }}>
      <Box 
          component="form" 
          noValidate 
          autoComplete="off" 
          sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
          onSubmit={onSubmit}
      >
        {children}
      </Box>
    </CardContent>
  );
}
