import './App.css';
import {Route, Routes} from 'react-router-dom'
import Main from './Main';
import Login from './Login';
import Signup from './Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
