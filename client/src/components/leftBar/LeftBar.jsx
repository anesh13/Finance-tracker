import "./leftBar.scss";
import { Link } from 'react-router-dom';

const LeftBar = () => {


    return (
        <div className="leftBar">
            <div className="container">


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
                    <Link to="/setting" style={{ textDecoration: "none" }}>
                        <h3>Settings</h3>
                    </Link>
                </div>


            </div>
        </div>
    );
};

export default LeftBar;
