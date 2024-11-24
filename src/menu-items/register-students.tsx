// third-party
import { FormattedMessage } from 'react-intl';

// assets
import PersonIcon from '@mui/icons-material/Person';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  PersonIcon
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const registerStudents: NavItemType = {
  id: 'group-register-students',
  title: <FormattedMessage id="menu.registerStudentsGroup" defaultMessage="Registro de Alunos" />,
  icon: icons.PersonIcon,
  type: 'group',
  children: [
    {
      id: 'register-students',
      title: <FormattedMessage id="menu.registerStudents" defaultMessage="Registro de Alunos" />,
      type: 'item',
      icon: icons.PersonIcon,
      breadcrumbs: false,
      url: '/registro-alunos'
    }
  ]
};

export default registerStudents;
