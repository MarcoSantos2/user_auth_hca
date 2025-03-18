import React, { useCallback, useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router';
import CheckboxFormField from '../components/CheckboxFormFiled';
import { Button, Modal, Typography } from '@mui/material';
import GoogleSignUpModal from '../components/GoogleSignUpModal';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  stay_connected: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const SignIn: React.FC = () => {
  const auth = useAuth();
  const [alert, setAlert] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [googleCredential, setGoogleCredential] = useState<string|null>(null);
  const [googleEmail, setGoogleEmail] = useState('');
  const [alertContent, setAlertContent] = useState('');
  // const [errors, setErrors] = useState<Record<string, string[]> | null>(null);  // TODO implement error improved error handling per field
  const navigate = useNavigate();

  useEffect(() => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: onGoogleResponse,
        ux_mode: 'popup',
        context: 'signin',
        prompt_parent_id: 'google_button',
      });
  }, []);

  const onGoogleResponse = useCallback(async (credentialResponse: CredentialResponse) => {
    const data = {
      token: credentialResponse.credential
    };
    const options = getApiOptions('POST', data);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signin`, options);

    if(response.ok){
        const data = await response.json();
        auth.login(data);
        navigate('/dashboard');
    } else {
        const responseBody = await response.json();
        if (responseBody.message === 'Google user not found') {
          const decodedPayload = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
          setGoogleEmail(decodedPayload.email);
          setGoogleCredential(credentialResponse.credential);
          setOpenModal(true);
        } else {          
          setAlert(true);
          setAlertContent(responseBody.message);
          // setErrors(responseBody.errors);  // TODO implement error improved error handling per field
        }
    }
  }, []);

  const onGoogleSignUp = useCallback(async (credential: string) => {
    const data = {
      token: credential
    };
    const options = getApiOptions('POST', data);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, options);

    if(response.ok){
        const data = await response.json();
        auth.login(data);
        setOpenModal(false)
        navigate('/dashboard');
    } else {
        const responseBody = await response.json();
        setAlert(true);
        setAlertContent(responseBody.message);
        // setErrors(responseBody.errors);  // TODO implement error improved error handling per field
    }
  }, []);

 const onSubmit = useCallback(async (event: React.FormEvent<SignInFormElement>) => {
       event.preventDefault();
       const formElements = event.currentTarget.elements;
 
       const data = {
         email: formElements.email.value,
         password: formElements.password.value,
         stay_connected: formElements.stay_connected.checked
       };
       const options = getApiOptions('POST', data);
       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/direct/signin`, options);
 
       if(response.ok){
           const data = await response.json();
           auth.login(data);
           navigate('/dashboard');
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
                <CheckboxFormField label={'Stay signed in'} nameId={'stay_connected'} />
            </Box>
            <SubmitButton >{'Log In'}</SubmitButton>
            <StyledDivider>{'or'}</StyledDivider>
            <ProviderButton id="sign_in_google_button" label="Continue with Google" icon={<Google className="h-5 w-5 g_id_signin" />} onClick={() => google.accounts.id.prompt()} />
        </StyledForm>
        <GoogleSignUpModal openModal={openModal} setOpenModal={setOpenModal} onGoogleSignUp={onGoogleSignUp} googleEmail={googleEmail} googleCredential={googleCredential || ''} />
      </Box>
    </Fade>
  );
}

export default SignIn;
