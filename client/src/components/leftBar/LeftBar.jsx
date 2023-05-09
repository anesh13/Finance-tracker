import './leftBar.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SportsScoreTwoToneIcon from '@mui/icons-material/SportsScoreTwoTone';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';


import { NavLink } from 'react-router-dom';


const LeftBar = () => {
  return (
    <div className='leftBar'>
      <div className='container'>
        <div className='menu'>
          <NavLink to='/' style={{ textDecoration: 'none' }}>
            <div className='item'>
              <HomeOutlinedIcon className='option' />
              <span className='option'>Dashboard</span>
            </div>
          </NavLink>
          <NavLink to='/transaction' style={{ textDecoration: 'none' }}>
            <div className='item'>
              <AttachMoneySharpIcon className='option' />
              <span className='option'>Transaction</span>
            </div>
          </NavLink>
          <NavLink to='/bill' style={{ textDecoration: 'none' }}>
            <div className='item'>
              <AttachMoneySharpIcon className='option' />
              <span className='option'>Bill</span>
            </div>
          </NavLink>
          <NavLink to='/budget' style={{ textDecoration: 'none' }}>
            <div className='item'>
              <SavingsOutlinedIcon className='option' />
              <span className='option'>Budget</span>
            </div>
          </NavLink>
          <NavLink to='/goal' style={{ textDecoration: 'none' }}>
            <div className='item'>
              <SportsScoreTwoToneIcon className='option' />
              <span className='option'>Goal</span>
            </div>
          </NavLink>
          <NavLink to='/settings' style={{ textDecoration: 'none' }}>
            <div className='item'>
              <SettingsIcon className='option' />
              <span className='option'>Settings</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};


export default LeftBar;
