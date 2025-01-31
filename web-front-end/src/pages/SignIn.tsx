import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';

import ProviderButton from '../components/ProviderButton';
import StyledDivider from '../components/StylesDivider';
import SubmitButton from '../components/SubmitButton';
import PasswordFormField from '../components/PasswordFormFiled';
import TextFormField from '../components/TextFormFiled';
import Google from '../icons/Google';
import StyledForm from '../components/StyledForm';
import StyledFormTitle from '../components/StyledFormTitle';
import { useAuth } from '../context';
import { getApiOptions } from '../utils/getApiOptions';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const SignIn: React.FC = () => {
  const auth = useAuth();
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  // const [errors, setErrors] = useState<Record<string, string[]> | null>(null);  // TODO implement error improved error handling per field

 const onSubmit = useCallback(async (event: React.FormEvent<SignInFormElement>) => {
       event.preventDefault();
       const formElements = event.currentTarget.elements;
 
       const data = {
         email: formElements.email.value,
         password: formElements.password.value
       };
       const options = getApiOptions('POST', data);
       const response = await fetch('http://localhost:3000/api/users/direct/signin', options); // TODO get the actual url domain from environment
 
       if(response.ok){
           const data = await response.json();
           auth.login(data);
       } else {
           const responseBody = await response.json();
           setAlert(true);
           setAlertContent(responseBody.message);
           // setErrors(responseBody.errors);  // TODO implement error improved error handling per field
       }
     }, []);

  return (
    <Fade in mountOnEnter unmountOnExit style={{ transitionDuration: '1000ms'}}>
      <Box sx={{ maxWidth: '394px', mx: 'auto', width: '100%' }}>
        <StyledFormTitle>{'Log in'}</StyledFormTitle>
        <StyledForm onSubmit={onSubmit}>
            {alert && <Alert severity="error">{alertContent}</Alert> }
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
