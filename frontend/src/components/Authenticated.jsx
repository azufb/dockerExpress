import SideMenu from "./SideMenu";
import { Outlet, useParams } from "react-router-dom";

const Authenticated = () => {
    const paramObj = useParams();
    return (
        <div>
            <h1>For Authenticated Member!</h1>
            <p>ID:{paramObj.userId}</p>
            <SideMenu />
            <Outlet />
        </div>
    )
}

export default Authenticated;