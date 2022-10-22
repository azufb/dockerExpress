import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { userState } from "../atoms/userAtom";
import { useSetRecoilState } from 'recoil';

const EditUserData = (props) => {
    const setUserData = useSetRecoilState(userState);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: props.defaultName,
            email: props.defaultEmail,
            password: ''
        }
    });
    const paramObj = useParams();

    const updateUserData = async (data) => {
        const param = {
            userId: paramObj.userId,
            name: data.name,
            email: data.email,
            password: data.password
        }

        let resData = undefined;

        await axios
        .post('http://localhost:6868/updateUserData', param)
        .then((res) => {
            console.log(res);
            resData = res.data;
        });

        if (resData.status === 200) {
            const setUserDataParam = {
                name: data.name,
                email: data.email
            };

            setUserData(setUserDataParam);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(updateUserData)}>
                <label>name:</label>
                <Input {...register('name')} />
                <label>email:</label>
                <Input {...register('email')} />
                <label>password:</label>
                <Input {...register('password')} />
                <input type='submit' />
            </form>
        </div>
    );
};

export default EditUserData;