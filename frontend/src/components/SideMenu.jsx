import { Link } from "react-router-dom";

const SideMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='ItemList'>一覧</Link>
                    <Link to='ItemRegisterForm'>登録</Link>
                    <Link to='UserData'>ユーザ情報</Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideMenu;