import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Authenticated from './components/Authenticated';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='SignUp' element={<SignUp />} />
                <Route path='SignIn' element={<SignIn />} />
                <Route path='Authenticated' element={<Authenticated />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;