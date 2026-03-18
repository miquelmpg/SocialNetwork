import { Routes, Route } from 'react-router';
import { HomePage, UserPage, RegisterPage, LoginPage} from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/users/:id' element={<UserPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
