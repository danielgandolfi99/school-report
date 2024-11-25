import { ReactNode, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, useMediaQuery, AppBarProps } from '@mui/material';

// project import

import useConfig from 'hooks/useConfig';
import { useGetMenuMaster } from 'api/menu';

// types
import { MenuOrientation } from 'types/config';
import HeaderContent from 'layout/DashboardLayout/Header/HeaderContent';
import AppBarStyled from 'layout/DashboardLayout/Header/AppBarStyled';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

const HeaderStudent = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { menuOrientation } = useConfig();

  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  // header content
  const headerContent = useMemo(() => <HeaderContent />, []);

  // common header
  const mainHeader: ReactNode = (
    <Toolbar>
      {headerContent}
    </Toolbar>
  );

  // app-bar params
  const appBar: AppBarProps = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      zIndex: 1200,
      width: isHorizontal ? '100%' : { xs: '100%', lg: `calc(100%)` }
    }
  };

  return (
    <>
      {!downLG ? (
        <AppBarStyled open={drawerOpen} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

export default HeaderStudent;
