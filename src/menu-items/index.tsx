import { NavItemType } from 'types/menu';
import registerStudents from './register-students';
import registerGrades from './register-grades';
import registerSubjects from './register-subjects';
import generateTranscript from './generate-transcript';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [registerStudents, registerSubjects, registerGrades, generateTranscript]
};

export default menuItems;
