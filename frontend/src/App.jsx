import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={isAuthenticated() ? <TodoList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
