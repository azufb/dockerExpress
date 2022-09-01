import ItemRegisterForm from "./ItemRegisterForm";
import ItemList from "./ItemList";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "../atoms/userInfoAtom";

const Authenticated = () => {
    const userInfo = useRecoilValue(userInfoAtom);
    return (
        <div>
            <h1>For Authenticated Member!</h1>
            <p>ID:{userInfo}</p>
            <ItemRegisterForm />
            <ItemList />
        </div>
    )
}

export default Authenticated;