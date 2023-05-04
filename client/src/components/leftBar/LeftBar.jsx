import "./leftBar.scss";
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
const LeftBar = () => {


    return (
        <div className="leftBar">
            <div className="container">

                <div className="menu">

                    <div className="item">
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <h3>Dashboard</h3>  </Link>
                    </div>

                    <div className="item">
                        <Link to="/transaction" style={{ textDecoration: "none" }}>
                            <h3>Transaction</h3>  </Link>
                    </div>

                    <div className="item">
                        <Link to="/budget" style={{ textDecoration: "none" }}>
                            <h3>Budget</h3>
                        </Link>
                    </div>

                    <div className="item">
                        <Link to="/goal" style={{ textDecoration: "none" }}>
                            <h3>Goal</h3>  </Link>
                    </div>

                    <div className="item">
                        <Link to="/settings" style={{ textDecoration: "none" }}>
                            <h3>Settings </h3>
                            < SettingsIcon />
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default LeftBar;
