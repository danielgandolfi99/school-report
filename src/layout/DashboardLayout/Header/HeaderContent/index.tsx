// material-ui
import { Stack, Typography } from '@mui/material';

import useUser from 'hooks/useUser';
import { Button } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
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
    </>
  );
};

export default HeaderContent;
