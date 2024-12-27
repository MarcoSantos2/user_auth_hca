import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

interface Props {
  children?: React.ReactNode | string,
}

export default function StyledFormTitle({children}: Props) {
  return (
    <CardHeader
    sx={{ paddingX: 2, paddingY: 0, marginTop: '36px', marginBottom: '36px' }}
    title={
      <Typography variant="h5" align="left">
        {children}
      </Typography>
    }
  />
  );
}
