import { Routes, Route } from 'react-router';
import { HomePage, UserPageActivity, RegisterPage, LoginPage, UserAccount } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/users/:id' element={<UserPageActivity />} />
      <Route path='/account/:id' element={<UserAccount />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default App
