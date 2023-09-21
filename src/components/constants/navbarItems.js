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
    icon: <HomeIcon/>,
    link: '/dashboard',color:"#6373e7"
  },
  {
    id: 1,
    text: 'Projects',
    icon: <DashboardIcon />,
    link: '/dashboard/projects',color:"#aee9f9"
  }, {
    id: 2,
    text: 'Assigned to me',
    icon: <AssignmentIcon />,
    link: '/dashboard/assigned',color:"#1b2b4e"
  }, {
    id: 3,
    text: 'Submitted by me',
    icon: <AutoAwesomeMotionIcon />,
    link: '/dashboard/submitted',color:"#f47e5d"
  },{
    id: 4,
    text: 'Modules',
    icon: <ViewModuleIcon />,
    link: '/dashboard/module',color:"#4fce87"
  },{
    id: 5,
    text: 'Bugs',
    icon: <PestControlIcon />,
    link: '/dashboard/bugs',color:"#f26139"
  },{
    id: 6,
    text: 'Users',
    icon: <PeopleAltOutlinedIcon />,
    link: '/dashboard/users',color:"#ee5273"
  }

]

export default navbarItems