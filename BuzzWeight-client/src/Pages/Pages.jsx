import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import Home from './Home/Home';
import NotFound from './Error/NotFound';
import Contact from './Contact/Contact';
import Login from './Login/Login';
import Navbar from '../Components/Navbar/Navbar';
import Dashboard from './Dashboard/Dashboard';
import Footer from '../Components/Footer/Footer';
import { AuthContext } from '../Auth/AuthContext';

function Pages() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/contacts' element={<Contact />} />
                {!isLoggedIn && <Route path='/login' element={<Login />} />}
                {isLoggedIn && <Route path='/dashboard' element={<Dashboard />} />}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default Pages;