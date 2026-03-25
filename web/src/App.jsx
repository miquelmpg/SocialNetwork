import { Routes, Route } from 'react-router';
import { useState } from 'react';
import { Navbar } from './components/ui';
import { HomePage, UserPageActivity, RegisterPage, LoginPage, UserAccount } from './pages';

function App() {
      const [toggle, setToggle] = useState(false);
      const [numPage, setNumPage] = useState(1);
  
  return (
    <div style={{backgroundColor: '#EA7171'}}>
      <Navbar toggle={toggle} setNumPage={setNumPage}/>
      <Routes>
        <Route path='/' element={<HomePage toggle={toggle} setToggle={setToggle} setNumPage={setNumPage}/>} />
        <Route path='/users/:id' element={<UserPageActivity toggle={toggle} setToggle={setToggle} />} />
        <Route path='/account/:id' element={<UserAccount />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App
