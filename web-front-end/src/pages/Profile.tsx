import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import StyledFormTitle from '../components/StyledFormTitle';

export const Profile: React.FC = () => {

  return (
    <Fade in mountOnEnter unmountOnExit style={{ transitionDuration: '1000ms'}}>
      <Box sx={{ maxWidth: '394px', mx: 'auto', width: '100%' }}>
        <StyledFormTitle>{'Profile Page'}</StyledFormTitle>
      </Box>
    </Fade>
  );
}

export default Profile;
