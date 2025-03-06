import Button, { ButtonProps } from '@mui/material/Button';
import { MouseEventHandler } from 'react';

interface Props {
  label: string;
  icon: React.ReactNode;
}

export default function ProviderButton(props: Omit<ButtonProps, 'startIcon' | 'variant' | 'size' | 'fullWidth'> & Props) {
  return (<Button
    variant="outlined"
    fullWidth
    size="large"
    startIcon={props.icon}
    {...props}
  >
    {props.label}
  </Button>);
}
