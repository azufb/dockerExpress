import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/react';
import axios from 'axios';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let checkRes;
        let signUpRes;
        let userId;
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
                userId = signUpRes.data.response.insertId;
            });

            navigate(`/Authenticated/${userId}`);
        } else {
            console.log('データが存在したみたいです。');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>name:</label>
            <Input {...register('name')} />
            <label>email:</label>
            <Input {...register('email')} />
            <label>password:</label>
            <Input {...register('password')} />
            <input type='submit' />
        </form>
    )
}

export default SignUp;