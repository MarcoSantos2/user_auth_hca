import React, {useMemo} from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router';
import { LinkProps } from '@mui/material/Link';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface SiteThemeProps {
  children: React.ReactNode
}

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

export default function SiteTheme({children}: SiteThemeProps) {
  const theme = useMemo(() => {
    return createTheme({
      components: {
        MuiLink: {
          defaultProps: {
            component: LinkBehavior,
          } as LinkProps,
        },
        MuiButtonBase: {
          defaultProps: {
            LinkComponent: LinkBehavior,
          },
        },
      },
      colorSchemes: {
        light: true,
        dark: true,
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
