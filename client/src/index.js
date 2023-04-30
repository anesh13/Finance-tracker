import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contextApi/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* wrap AuthProvider in App to pass value */}
    <AuthProvider>
      <App />
    </AuthProvider>


  </React.StrictMode>
);

