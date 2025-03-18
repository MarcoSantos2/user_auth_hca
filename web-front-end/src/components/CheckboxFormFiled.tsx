import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';

interface Props {
  label: string,
  nameId: string
}

export default function CheckboxFormField({label, nameId, ...rest}: Props & CheckboxProps) {
  return (
    <FormControlLabel 
    required={rest.required} 
    label={label} 
    name={nameId} 
    control={<Checkbox {...rest} />}>
  </FormControlLabel>
  );
}
