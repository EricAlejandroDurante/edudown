import logo from './logo.svg';
import { Button } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <form action='/lala' method='POST'>
      <div>
        <span>
          lala
        </span>
        <input name='campo'/>
      </div>
      <input name='campo-2'/>
      <input type='submit' value='Enviar'/>
    </form>
  );
}

export default App;