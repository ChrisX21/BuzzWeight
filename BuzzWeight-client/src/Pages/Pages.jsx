import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Home from './Home/Home';
import NotFound from './Error/NotFound';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import Navbar from '../Components/Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import DashboardNavbar from '../Components/DashboardNavbar/DashboardNavbar';
import Footer from '../Components/Footer/Footer';
import { AuthContext } from '../Auth/AuthContext';
import Users from './Users/Users';
import Settings from './Settings/Settings';

function Pages() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useContext(AuthContext);
    return (
        <Router>
            {isLoggedIn ? (<DashboardNavbar />) : <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/contacts' element={<Contact />} />
                {!isLoggedIn && <Route path='/login' element={<Login />} />}
                {isLoggedIn && <Route path='/dashboard' element={<Dashboard />} />}
                (isLoggedIn && isAdmin) && {
                    <>
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/users' element={<Users />} />
                    </>
                }
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default Pages;