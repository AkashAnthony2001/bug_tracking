import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BugReportIcon from '@mui/icons-material/BugReport';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PestControlIcon from '@mui/icons-material/PestControl';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import ViewListIcon from '@mui/icons-material/ViewList';

const navbarItems = [
  {
    id: 0,
    text: 'Home', 
    icon: <HomeIcon/>,
    link: '/dashboard',color:"#0E2954",
  },
  {
    id: 1,
    text: 'Projects',
    icon: <DashboardIcon />,
    link: '/dashboard/projects',color:"#9E4784"
  }, {
    id: 2,
    text: 'Modules',
    icon: <ViewModuleIcon />,
    link: '/dashboard/module',color:"#f26139"
  },{
    id: 3,
    text: 'Users',
    icon: <PeopleAltOutlinedIcon />,
    link: '/dashboard/users',color:"#1B2430"
  },{
    id: 4,
    text: 'Assigned to me',
    icon: <AssignmentIcon />,
    link: '/dashboard/assigned',color:"#6E85B2"
  },{
    id: 5,
    text: 'Submitted by me',
    icon: <AutoAwesomeMotionIcon />,
    link: '/dashboard/submitted',color:"#790252"
  },{
    id: 6,
    text: 'Bugs',
    icon: <PestControlIcon />,
    link: '/dashboard/bugs',color:"#03C988"
  },{
    id: 7,
    text: 'Sprint View',
    icon: <ViewListIcon />,
    link: '/dashboard/sprintView',color:"#790252"
  }
];

export default navbarItems;
