import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BugReportIcon from '@mui/icons-material/BugReport';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PestControlIcon from '@mui/icons-material/PestControl';
import ViewModuleIcon from '@mui/icons-material/ViewModule';



const navbarItems = [
  {
    id: 0,
    text: 'Home',
    icon: <HomeIcon/>,
    link: '/dashboard'
  },
  {
    id: 1,
    text: 'Projects',
    icon: <DashboardIcon />,
    link: '/dashboard/projects'
  }, {
    id: 2,
    text: 'Assigned to me',
    icon: <AssignmentIcon />,
    link: '/dashboard/assigned'
  }, {
    id: 3,
    text: 'Submitted by me',
    icon: <BugReportIcon />,
    link: '/dashboard/submitted'
  }, {
    id: 4,
    text: 'Users',
    icon: <PeopleAltOutlinedIcon />,
    link: '/dashboard/users'
  },{
    id: 5,
    text: 'Modules',
    icon: <ViewModuleIcon />,
    link: '/dashboard/module'
  },{
    id: 6,
    text: 'Bugs',
    icon: <PestControlIcon />,
    link: '/dashboard/bugs'
  }
]

export default navbarItems