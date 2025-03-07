import React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import StyledFormTitle from '../components/StyledFormTitle';

export const AcceptInvite: React.FC = () => {

  return (
    <Fade in mountOnEnter unmountOnExit style={{ transitionDuration: '1000ms'}}>
      <Box sx={{ maxWidth: '394px', mx: 'auto', width: '100%' }}>
        <StyledFormTitle>{'Accept Invite Page'}</StyledFormTitle>
      </Box>
    </Fade>
  );
}

export default AcceptInvite;
