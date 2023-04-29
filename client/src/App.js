import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
} from "react-router-dom";


import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import Footer from "./components/footer/Footer";
import Goal from "./components/goal/Goal";
import Transaction from "./components/transaction/Transaction";
import Budget from "./components/budget/Budget";
const App = () => {
    // const currentUser = localStorage.getItem('username');


    const Layout = () => {
        return (

            <div>
                <Navbar />
                <div style={{ display: "flex" }}>
                    <LeftBar />

                    {/* 1/3 space for leftbar and 2/3 space for outlet */}
                    <div style={{ flex: 3 }}>
                        {/* nested routes inside root route */}
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>

        );
    };

    const ProtectedRoute = ({ children }) => {
        // if (!currentUser) {
        //   return <Navigate to="/login" />;
        // }

        return children;
    }

    //define the routes
    const router = createBrowserRouter([
        {
            //root route
            path: "/",
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            //nested routes
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/transaction",
                    element: <Transaction />,
                },
                {
                    path: "/budget",
                    element: <Budget />,
                },
                {
                    path: "/goal",
                    element: <Goal />,
                },
            ],
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ]);

    return (
        <div className="App">

            <RouterProvider router={router} />

        </div>
    );
}

export default App;
