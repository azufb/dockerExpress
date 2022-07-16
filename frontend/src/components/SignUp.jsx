import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUp = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        await axios
            .post('http://localhost:6868/signUp', data)
            .then(res => {
                console.log(res);
            });
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