import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

interface SiteContentProps {
  children: React.ReactNode
}

export default function SiteContent(props: SiteContentProps) {
  const theme = useTheme();

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        // backgroundColor: 'lightblue', // For visualization
        minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 64px)`, // Subtracting header and footer heights
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.children}
    </Container>
  );
}
