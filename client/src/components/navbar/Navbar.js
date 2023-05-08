import './navbar.scss';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from 'react-router-dom';


const Navbar = () => {
 return (
   <div className='navbar'>
     <div className='left'>
       <Link to='/' style={{ textDecoration: 'none' }}>
         <span className='logo'>Finance Tracker</span>
       </Link>
     </div>


     <div className='right'>
       <NotificationsOutlinedIcon className='icon-cls' />
       <PersonOutlinedIcon className='icon-cls' />
     </div>
   </div>
 );
};


export default Navbar;
