// third-party
import { FormattedMessage } from 'react-intl';

// assets
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  LibraryBooksIcon
};

// ==============================|| MENU ITEMS - SUBJECTS ||============================== //

const registerSubjects: NavItemType = {
  id: 'group-register-subjects',
  title: <FormattedMessage id="menu.registerSubjectsGroup" defaultMessage="Registro de Disciplinas" />,
  icon: icons.LibraryBooksIcon,
  type: 'group',
  children: [
    {
      id: 'register-subjects',
      title: <FormattedMessage id="menu.registerSubjects" defaultMessage="Registro de Disciplinas" />,
      type: 'item',
      icon: icons.LibraryBooksIcon,
      breadcrumbs: false,
      url: '/registro-disciplinas'
    }
  ]
};

export default registerSubjects;
