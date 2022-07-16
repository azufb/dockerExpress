import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';

const Form = () => {
    const { register, handleSubmit } = useForm();
    const [text, setText] = useState('');

    const onSubmit = async (data) => {
        await axios
            .post('http://localhost:6868/api', data)
            .then(res => {
                console.log(res.config.data);
                setText(res.config.data);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>name：</label>
                <input {...register('name')} />
                <input type='submit' />
            </form>

            <div>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Form;