import Button from '@mui/material/Button';

export default function SubmitButton({children}: any) {
  return (
    <Button
    type="submit"
    variant="contained"
    fullWidth
    size="large"
  >
    {children}
  </Button>
  );
}
