import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='SignUp' element={<SignUp />} />
                <Route path='SignIn' element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;