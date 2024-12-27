import Button from '@mui/material/Button';

interface Props {
  label: string;
  icon: JSX.Element;
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
