import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import { isOpenModalsAtom } from "../atoms/isOpenModals";
import { useRecoilState } from "recoil";
import EditUserData from "./EditUserData";

const UserData = () => {
    const [userData, setUserData] = useRecoilState(userState);
    const [isOpenEditUserModal, setIsOpenEditUserModal] = useRecoilState(isOpenModalsAtom);
    const paramObj = useParams();

    useEffect(() => {
        const getUserData = async () => {
            const param = {
                userId: paramObj.userId
            };

            let resData = undefined;

            await axios
            .post('http://localhost:6868/getUserData', param)
            .then((res) => {
                console.log(res);
                resData = res.data;
            });

            if (resData.status === 200) {
                const getUserData = {
                    name: resData.response.name,
                    email: resData.response.email
                };

                setUserData(getUserData);
            }
        }

        getUserData();
    }, [paramObj.userId, userData]);

    const handleOpenEditUserModal = () => {
        setIsOpenEditUserModal((currentState) => ({
            ...currentState,
            editUserModal: true
        }));
    }

    return (
        <div>
            <p>ユーザー名：</p>
            <p>{userData.name}</p>
            <p>メールアドレス：</p>
            <p>{userData.email}</p>

            <div>
                <button onClick={handleOpenEditUserModal}>編集</button>
            </div>

            <div>
                {isOpenEditUserModal.editUserModal && (
                    <EditUserData
                        defaultName={userData.name}
                        defaultEmail={userData.email}
                    />
                )}
            </div>
        </div>
    );
};

export default UserData;