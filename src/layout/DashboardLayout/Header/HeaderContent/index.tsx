// material-ui
import { Stack, Typography } from '@mui/material';

// project import
// import Profile from './Profile';
import useUser from 'hooks/useUser';
import { Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';

// import useConfig from 'hooks/useConfig';
// import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader';

// type
// import { MenuOrientation } from 'types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  // const { menuOrientation } = useConfig();
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  const user = useUser();

  const name = user?.user.name;

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
    localStorage.removeItem('session');
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <>
      {/* {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />} */}
      <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between" width="100%">
        {pathname !== '/' && (
          <Button
            variant="contained"
            onClick={() => router.push('/')}
            startIcon={<HomeIcon sx={{ height: 16, width: 16 }} />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Voltar para a tela Inicial
          </Button>
        )}
        <Typography variant="h5" whiteSpace="nowrap">
          Olá {name}
        </Typography>
        <Button variant="contained" endIcon={<LogoutIcon sx={{ height: 16, width: 16 }} />} onClick={handleLogout}>
          Sair da Conta
        </Button>
      </Stack>
      {/* {!downLG && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />} */}
      {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />} */}

      {/* {<Profile />} */}
      {/* {downLG && <MobileSection />} */}
    </>
  );
};

export default HeaderContent;
