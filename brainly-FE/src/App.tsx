import './App.css'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import ErrorPage from './components/ErrorPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signUp" />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/errorpage" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
