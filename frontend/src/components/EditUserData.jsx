import { useForm } from 'react-hook-form';
import { Input } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditUserData = () => {
    const { register, handleSubmit } = useForm();
    const paramObj = useParams();

    const updateUserData = async (data) => {
        const param = {
            userId: paramObj.userId,
            name: data.name,
            email: data.email,
            password: data.password
        }

        await axios
        .post('http://localhost:6868/updateUserData', param)
        .then((res) => {
            console.log(res);
        })
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