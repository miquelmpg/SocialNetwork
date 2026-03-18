import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router  } from 'react-router';
import { AuthContextProvider } from './contexts/auth-context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Router>
  </StrictMode>,
);
