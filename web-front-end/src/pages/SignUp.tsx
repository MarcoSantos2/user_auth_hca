import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from '../icons/Google';

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  return (
    <Box sx={{ maxWidth: '394px', mx: 'auto', width: '100%' }}>
      <CardHeader 
        sx={{ paddingX: 2, paddingY: 0, marginTop: '36px', marginBottom: '36px' }}
        title={
          <Typography variant="h5" align="left">
            Sign up
          </Typography>
        }
      />
      <CardContent sx={{ paddingX: 2, paddingY: 0 }}>
        <Box 
            component="form" 
            noValidate 
            autoComplete="off" 
            sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}
            onSubmit={async (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                console.log({
                  fullName: data.get('fullName'),
                  companyName: data.get('companyName'),
                  email: data.get('email'),
                  password: data.get('password'),
                  confirmPassword: data.get('confirmPassword'),
                });
              }
            }
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <FormControl required fullWidth>
                    <InputLabel htmlFor="fullName">Full Name</InputLabel>
                    <OutlinedInput
                    id="fullName"
                    name='fullName'
                    label="Full Name"
                    placeholder="Enter your full name"
                    />
                </FormControl>

                <FormControl required fullWidth>
                    <InputLabel htmlFor="companyName">Company Name</InputLabel>
                    <OutlinedInput
                    id="companyName"
                    name='companyName'
                    label="Company Name"
                    placeholder="Enter your company name"
                    />
                </FormControl>

                <FormControl required fullWidth>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                    id="email"
                    name='email'
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    />
                </FormControl>

                <FormControl required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                    id="password"
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                    <FormHelperText>Password should be at least 8 characters</FormHelperText>
                </FormControl>

                <FormControl required fullWidth>
                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                    <OutlinedInput
                    id="confirmPassword"
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                        >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                    <FormHelperText>Password should match the password above</FormHelperText>
                </FormControl>
            </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Sign Up
          </Button>

          <Box sx={{ position: 'relative', py: 0 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                or
              </Typography>
            </Divider>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<Google className="h-5 w-5" />}
          >
            Continue with Google
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
}

export default SignUp;
