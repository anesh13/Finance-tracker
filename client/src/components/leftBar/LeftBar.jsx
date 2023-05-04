import "./leftBar.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SportsScoreTwoToneIcon from "@mui/icons-material/SportsScoreTwoTone";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";

import { NavLink } from "react-router-dom";

const LeftBar = () => {
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <NavLink to="/" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <HomeOutlinedIcon />
                            <span>Dashboard</span>
                        </div>
                    </NavLink>
                    <NavLink to="/transaction" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <AttachMoneySharpIcon />
                            <span>Transaction</span>
                        </div>
                    </NavLink>
                    <NavLink to="/budget" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <SavingsOutlinedIcon />
                            <span>Budget</span>
                        </div>
                    </NavLink>
                    <NavLink to="/goal" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <SportsScoreTwoToneIcon />
                            <span>Goal</span>
                        </div>
                    </NavLink>
                    <NavLink to="/settings" style={{ textDecoration: "none" }}>
                        <div className="item">
                            <SettingsIcon />
                            <span>Settings</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
