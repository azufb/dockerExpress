import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Homeです。</h1>
            <nav>
                <ul>
                    <li><Link to='SignUp'>サインアップ</Link></li>
                    <li><Link to='SignIn'>サインイン</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Home;