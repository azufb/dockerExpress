import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        let resData;
        await axios
            .post('http://localhost:6868/check', data)
            .then(res => {
                console.log(res);
                resData = res;
            });
        
        if (resData.status === 200) {
            await axios
            .post('http://localhost:6868/signUp', data)
            .then(res => {
                console.log(res);
            });

            navigate('/Authenticated');

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