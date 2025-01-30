import Button from '@mui/material/Button';

interface Props {
  label: string;
  icon: React.ReactNode;
}

export default function ProviderButton({label, icon}: Props) {
  return (<Button
    variant="outlined"
    fullWidth
    size="large"
    startIcon={icon}
  >
    {label}
  </Button>);
}
