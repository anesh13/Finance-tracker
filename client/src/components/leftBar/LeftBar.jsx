import "./leftBar.scss";
import { Link } from 'react-router-dom';

import SettingsIcon from '@mui/icons-material/Settings';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SportsScoreTwoToneIcon from '@mui/icons-material/SportsScoreTwoTone';

import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
const LeftBar = () => {


    return (
        <div className="leftBar">
            <div className="container">

                <div className="menu">

                    <Link to="/" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <HomeOutlinedIcon />
                            <span>Dashboard</span>

                        </div>
                    </Link>
                    <Link to="/transaction" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <AttachMoneySharpIcon />
                            <span>Transaction</span>
                        </div>
                    </Link>

                    <Link to="/budget" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <SavingsOutlinedIcon />
                            <span>Budget</span>
                        </div>
                    </Link>

                    <Link to="/goal" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <SportsScoreTwoToneIcon />
                            <span>Goal</span>
                        </div>
                    </Link>
                    <Link to="/settings" style={{ textDecoration: "none" }}>
                        <div className="item">

                            < SettingsIcon />
                            <span>Settings </span>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default LeftBar;
