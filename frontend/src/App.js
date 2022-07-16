import './App.css';
import Form from './components/Form';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => {

  return (
    <div className="App">
      <h1>こんにちは、世界。</h1>
      <Form />
      <SignUp />
      <SignIn />
    </div>
  );
}

export default App;
