import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Authenticated from './components/Authenticated';
import ItemDetail from './components/ItemDetail';
import ItemList from './components/ItemList';
import ItemRegisterForm from './components/ItemRegisterForm';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path='SignUp' element={<SignUp />} />
                <Route path='SignIn' element={<SignIn />} />
                <Route path='Authenticated/:userId' element={<Authenticated />}>
                    <Route path='ItemList' element={<ItemList />} />
                    <Route path='ItemRegisterForm' element={<ItemRegisterForm />} />
                    <Route path='ItemDetail' element={<ItemDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;