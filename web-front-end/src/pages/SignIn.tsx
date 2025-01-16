import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import ProviderButton from '../components/ProviderButton';
import StyledDivider from '../components/StylesDivider';
import SubmitButton from '../components/SubmitButton';
import PasswordFormField from '../components/PasswordFormFiled';
import TextFormField from '../components/TextFormFiled';
import Google from '../icons/Google';
import StyledForm from '../components/StyledForm';
import StyledFormTitle from '../components/StyledFormTitle';

export const SignIn: React.FC = () => {
  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log('SignIn: Form Data:', {
        fullName: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
      });
    }, []);

  return (
    <Fade in mountOnEnter unmountOnExit style={{ transitionDuration: '1000ms'}}>
      <Box sx={{ maxWidth: '394px', mx: 'auto', width: '100%' }}>
        <StyledFormTitle>{'Log in'}</StyledFormTitle>
        <StyledForm onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <TextFormField label={'Email'} nameId={'email'} type="email" placeholder={'Enter your email'} />
                <PasswordFormField label={'Password'} nameId={'password'} helperText={'Password should be at least 8 characters'} />
            </Box>
            <SubmitButton >{'Log In'}</SubmitButton>
            <StyledDivider>{'or'}</StyledDivider>
            <ProviderButton label="Continue with Google" icon={<Google className="h-5 w-5" />} />
        </StyledForm>
      </Box>
    </Fade>
  );
}

export default SignIn;
