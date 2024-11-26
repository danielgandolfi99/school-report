import { NavItemType } from 'types/menu';
import registerStudents from './register-students';
import registerGrades from './register-grades';
import registerDisciplines from './register-disciplines';
import generateTranscript from './generate-transcript';
import home from './home';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [home, registerStudents, registerDisciplines, registerGrades, generateTranscript]
};

export default menuItems;
