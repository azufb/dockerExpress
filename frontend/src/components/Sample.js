import axios from 'axios';
import { useState } from 'react';

const Sample = () => {
    //const [message, setMessage] = useState('');

    axios.get('http://localhost:8080/api', {
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(res => {
        //setMessage(res.data.message);
    });

    return (
        <div>
            <h1>message:</h1>
        </div>
    );
}

export default Sample;