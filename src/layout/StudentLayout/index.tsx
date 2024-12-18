'use client';

import { useEffect, ReactNode } from 'react';

// material-ui
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Loader from 'components/Loader';

import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// types
import { MenuOrientation } from 'types/config';
import { useTheme } from '@mui/material/styles';
import HeaderStudent from './Header';

// ==============================|| MAIN LAYOUT ||============================== //

interface Props {
  children: ReactNode;
}

const StudentLayout = ({ children }: Props) => {
  const theme = useTheme();
  const { menuMasterLoading } = useGetMenuMaster();
  const matchDownXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { miniDrawer, menuOrientation } = useConfig();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!matchDownXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <HeaderStudent />
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 1, sm: 1 } }}>
        <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit' }} />
        {children}
      </Box>
    </Box>
  );
};

export default StudentLayout;
