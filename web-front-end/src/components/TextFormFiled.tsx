import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

interface Props {
  label: string,
  nameId: string,
  placeholder: string
  type?: string,
}

export default function TextFormField({label, nameId, type, placeholder}: Props) {
  return (
    <FormControl required fullWidth>
      <InputLabel htmlFor={nameId}>{label}</InputLabel>
      <OutlinedInput
      id={nameId}
      name={nameId}
      type={type}
      label={label}
      placeholder={placeholder}
      />
  </FormControl>
  );
}
