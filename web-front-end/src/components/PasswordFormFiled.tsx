import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  label: string,
  nameId: string,
  helperText?: string
}

export default function PasswordFormField({label, nameId, helperText}: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl required fullWidth>
      <InputLabel htmlFor={nameId}>{label}</InputLabel>
      <OutlinedInput
      id={nameId}
      name={nameId}
      type={showPassword ? 'text' : 'password'}
      label={label}
      endAdornment={
          <InputAdornment position="end">
          <IconButton
              aria-label={`toggle ${label} visibility`}
              onClick={handleClickShowPassword}
              edge="end"
          >
              {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          </InputAdornment>
      }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
  );
}
