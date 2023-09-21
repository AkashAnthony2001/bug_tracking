import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BugReportIcon from '@mui/icons-material/BugReport';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PestControlIcon from '@mui/icons-material/PestControl';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

const navbarItems = [
  {
    id: 0,
    text: 'Home',
    icon: <HomeIcon style={{ color: 'black' }} />,
    link: '/dashboard',
    
  },
  {
    id: 1,
    text: 'Projects',
    icon: <DashboardIcon style={{ color: 'black' }} />,
    link: '/dashboard/projects',
  }, {
    id: 2,
    text: 'Modules',
    icon: <ViewModuleIcon style={{ color: 'black' }} />,
    link: '/dashboard/module',
  }, {
    id: 3,
    text: 'Users',
    icon: <PeopleAltOutlinedIcon style={{ color: 'black' }} />,
    link: '/dashboard/users',
  },{
    id: 4,
    text: 'Assigned to me',
    icon: <AssignmentIcon style={{ color: 'black' }} />,
    link: '/dashboard/assigned',
  },{
    id: 5,
    text: 'Submitted by me',
    icon: <AutoAwesomeMotionIcon style={{ color: 'black' }} />,
    link: '/dashboard/submitted',
  },{
    id: 6,
    text: 'Bugs',
    icon: <PestControlIcon style={{ color: 'black' }} />,
    link: '/dashboard/bugs',
  }
];

export default navbarItems;
