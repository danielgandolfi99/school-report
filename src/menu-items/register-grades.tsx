// third-party
import { FormattedMessage } from 'react-intl';

// assets
import DescriptionIcon from '@mui/icons-material/Description';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  DescriptionIcon
};

// ==============================|| MENU ITEMS - GRADES ||============================== //

const registerGrades: NavItemType = {
  id: 'group-register-grades',
  title: <FormattedMessage id="menu.registerGradesGroup" defaultMessage="Registro de Notas" />,
  icon: icons.DescriptionIcon,
  type: 'group',
  children: [
    {
      id: 'register-grades',
      title: <FormattedMessage id="menu.registerGrades" defaultMessage="Registro de Notas" />,
      type: 'item',
      icon: icons.DescriptionIcon,
      breadcrumbs: false,
      url: '/registro-notas'
    }
  ]
};

export default registerGrades;
