// material-ui
import { Theme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';

// project import
import Profile from './Profile';
import MobileSection from './MobileSection';

// import useConfig from 'hooks/useConfig';
// import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader';

// type
// import { MenuOrientation } from 'types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  // const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      {/* {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />} */}
      {!downLG && <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }} />}
      {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;
