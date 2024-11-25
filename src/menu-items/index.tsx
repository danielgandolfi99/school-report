import { NavItemType } from 'types/menu';
import registerStudents from './register-students';
import registerGrades from './register-grades';
import registerDisciplines from './register-disciplines';
import generateTranscript from './generate-transcript';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [registerStudents, registerDisciplines, registerGrades, generateTranscript]
};

export default menuItems;
