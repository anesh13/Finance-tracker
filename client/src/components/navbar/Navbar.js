import { useState, useContext } from 'react';
import './navbar.scss';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';  //https://mui.com/material-ui/react-menu/
import MenuItem from '@mui/material/MenuItem';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';
import { AuthContext } from '../../contextApi/AuthContext';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useContext(AuthContext);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Finance Tracker</span>
        </Link>
      </div>

      <div className="right">
        <NotificationsOutlinedIcon className="icon-cls" />
        <div onClick={handleClick}>
          <PersonOutlinedIcon className="icon-cls" />
        </div>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>

        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
