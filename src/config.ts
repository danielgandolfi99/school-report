// next
import { Public_Sans } from 'next/font/google';

// types
import { DefaultConfigProps, MenuOrientation, ThemeDirection, ThemeMode } from 'types/config';

// ==============================|| THEME CONSTANT ||============================== //

export const twitterColor = '#1DA1F2';
export const facebookColor = '#3b5998';
export const linkedInColor = '#0e76a8';

export const APP_DEFAULT_PATH = '/';
export const HORIZONTAL_MAX_ITEM = 7;
export const DRAWER_WIDTH = 260;
export const MINI_DRAWER_WIDTH = 60;

const publicSans = Public_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

// ==============================|| THEME CONFIG ||============================== //

const config: DefaultConfigProps = {
  fontFamily: publicSans.style.fontFamily,
  i18n: 'en',
  menuOrientation: MenuOrientation.VERTICAL,
  miniDrawer: false,
  container: true,
  mode: ThemeMode.LIGHT,
  presetColor: 'theme6',
  themeDirection: ThemeDirection.LTR
};

export default config;
