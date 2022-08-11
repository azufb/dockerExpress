import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignIn = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await axios
            .post('http://localhost:6868/signIn', data)
            .then(res => {
                console.log(res.data.response);
            });
        navigate('/Authenticated');
    }

    return (
        <div>
            <h2>サインインする！</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>email:</label>
                <input {...register('email')} />
                <label>password:</label>
                <input {...register('password')} />
                <input type='submit' />
            </form>
        </div>
    )
}

export default SignIn;