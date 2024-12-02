// import { useRef, useState } from 'react';

// next
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

// material-ui
// import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

// project import
// import Avatar from 'components/@extended/Avatar';
// import MainCard from 'components/MainCard';
// import Transitions from 'components/@extended/Transitions';
// import IconButton from 'components/@extended/IconButton';
// import useUser from 'hooks/useUser';
import LogoutIcon from '@mui/icons-material/Logout';

// types
// import { ThemeMode } from 'types/config';

// assets
// import { LogoutOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  // const theme = useTheme();
  // const user = useUser();
  const router = useRouter();
  const { data: session } = useSession();

  const provider = session?.provider;

  const handleLogout = () => {
    switch (provider) {
      case 'auth0':
        signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/logout/auth0` });
        break;
      case 'cognito':
        signOut({ callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/logout/cognito` });
        break;
      default:
        signOut({ redirect: false });
    }

    router.push('/login');
  };

  // const anchorRef = useRef<any>(null);
  // const [open, setOpen] = useState(false);
  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event: MouseEvent | TouchEvent) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Button variant="contained" endIcon={<LogoutIcon sx={{ height: 16, width: 16 }} />} onClick={handleLogout}>
        Sair da Conta
      </Button>
      {/* <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {user && (
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
            <Avatar alt={user.user.name} src={'/assets/images/users/avatar-1.png'} size="sm" />
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
              {user.user.name && user.user.name}
            </Typography>
          </Stack>
        )}
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: 290,
                [theme.breakpoints.down('md')]: {
                  maxWidth: 250
                }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        {user && (
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <Avatar src={'/assets/images/users/avatar-1.png'} />
                            <Typography variant="h6">{user.user.name}</Typography>
                          </Stack>
                        )}
                      </Grid>
                      <Grid item>
                        <Tooltip title="Sair">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper> */}
    </Box>
  );
};

export default Profile;
