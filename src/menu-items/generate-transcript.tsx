// third-party
import { FormattedMessage } from 'react-intl';

// assets
import HistoryIcon from '@mui/icons-material/History';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  HistoryIcon
};

// ==============================|| MENU ITEMS - TRANSCRIPTS ||============================== //

const generateTranscript: NavItemType = {
  id: 'group-generate-transcript',
  title: <FormattedMessage id="menu.generateTranscriptGroup" defaultMessage="Histórico Escolar" />,
  icon: icons.HistoryIcon,
  type: 'group',
  children: [
    {
      id: 'generate-transcript',
      title: <FormattedMessage id="menu.generateTranscript" defaultMessage="Gerar Histórico" />,
      type: 'item',
      icon: icons.HistoryIcon,
      breadcrumbs: false,
      url: '/registro-historico'
    }
  ]
};

export default generateTranscript;
