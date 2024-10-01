import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home/Home'
import NotFound from './Error/NotFound'
import Contact from './Contact/Contact'
import Login from './Login/Login'
import Navbar from '../Components/Navbar/Navbar'


function Pages() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/contacts' element={<Contact />} />
                <Route path='/login' element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default Pages