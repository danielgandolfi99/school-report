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

const registerDisciplines: NavItemType = {
  id: 'group-register-disciplines',
  title: <FormattedMessage id="menu.registerDisciplinesGroup" defaultMessage="Registro de Disciplinas" />,
  icon: icons.LibraryBooksIcon,
  type: 'group',
  children: [
    {
      id: 'register-disciplines',
      title: <FormattedMessage id="menu.registerDisciplines" defaultMessage="Registro de Disciplinas" />,
      type: 'item',
      icon: icons.LibraryBooksIcon,
      breadcrumbs: false,
      url: '/registro-disciplinas'
    }
  ]
};

export default registerDisciplines;
