import { Link } from "react-router-dom";
import { HomeNavigationButtons } from '../styles/HomeStyle';

const Home = () => {
    return (
        <div>
            <HomeNavigationButtons>
                <div>
                    <Link to='SignUp'>サインアップ</Link>
                </div>
                <div>
                    <Link to='SignIn'>サインイン</Link>
                </div>
            </HomeNavigationButtons>
        </div>
    )
}

export default Home;