import { useState } from 'react';
import './App.css';
import Form from './components/Form';

const App = () => {
  const [message, setMessage] = useState('aaa');

  return (
    <div className="App">
      <h1>こんにちは、世界。</h1>
      <p>{message}</p>
      <Form />
    </div>
  );
}

export default App;
