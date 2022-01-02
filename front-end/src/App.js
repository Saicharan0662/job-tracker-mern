import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditJob from './pages/EditJob';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path='/edit-job/:jobId' element={<EditJob />} />
      </Routes>
    </Router>
  );
}

export default App;
