import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Authenticated from './components/Authenticated';
import ItemDetail from './components/ItemDetail';
import ItemList from './components/ItemList';
import ItemRegisterForm from './components/ItemRegisterForm';
import UserData from './components/UserData';

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
                    <Route path='ItemDetail/:itemId' element={<ItemDetail />} />
                    <Route path='UserData' element={<UserData />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;