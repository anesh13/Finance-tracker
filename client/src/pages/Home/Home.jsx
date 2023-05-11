import Dashboard from "../../components/dashboard/Dashboard";
//import { Helmet } from 'react-helmet';
import "./home.scss"
const Home = () => {


    return (
        <>
            {/* <Helmet>
            <title>Finance tracker</title>
            <meta name="description" content="Track your personal finances with ease using our finance tracker app. Manage your budget, expenses, and income all in one place." />
            <meta name="keywords" content="personal finance, budget tracker, expense tracker, income tracker" />
        </Helmet> */}
            <div className="home">
                <Dashboard />
            </div>
        </>
    )
}
export default Home;