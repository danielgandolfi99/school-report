// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HomeIcon from '@mui/icons-material/Home';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  HomeIcon
};

// ==============================|| MENU ITEMS - SUBJECTS ||============================== //

const home: NavItemType = {
  id: 'group-home',
  title: <FormattedMessage id="menu.home" defaultMessage="Início" />,
  icon: icons.HomeIcon,
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="menu.home" defaultMessage="Início" />,
      type: 'item',
      icon: icons.HomeIcon,
      breadcrumbs: false,
      url: '/'
    }
  ]
};

export default home;
