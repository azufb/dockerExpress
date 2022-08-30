import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom } from '../atoms/userInfoAtom';
import axios from 'axios';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const setUserId = useSetRecoilState(userInfoAtom);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let checkRes;
        let signUpRes;
        await axios
            .post('http://localhost:6868/check', data)
            .then(res => {
                console.log(res);
                checkRes = res;
            });
        
        if (checkRes.status === 200) {
            await axios
            .post('http://localhost:6868/signUp', data)
            .then(res => {
                console.log(res);
                signUpRes = res;
            });

            setUserId(signUpRes.data.response.insertId);
            navigate(`/Authenticated/${signUpRes.data.response.insertId}`);

        } else {
            console.log('データが存在したみたいです。');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>name:</label>
            <input {...register('name')} />
            <label>email:</label>
            <input {...register('email')} />
            <label>password:</label>
            <input {...register('password')} />
            <input type='submit' />
        </form>
    )
}

export default SignUp;