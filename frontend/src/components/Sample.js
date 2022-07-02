import axios from 'axios';
import { useState, useEffect } from 'react';

const Sample = async () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const axiosFunc = async () => {
            await axios.get('http://localhost:8080/api', {
                headers: {
                'Content-Type': 'application/json'
                }
            }).then(res => {
                setMessage(res.data.message);
            });
        }

        axiosFunc();
    }, []);

    return (
        <div>
            <h1>message: {message}</h1>
        </div>
    )
}

export default Sample;