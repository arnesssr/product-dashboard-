import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ProductProvider } from '@/context/ProductContext';
import { AuthProvider } from '@/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
);
// This code is the main entry point for a React application. It imports necessary modules and renders the main App component wrapped in context providers for authentication and product management.
// The App component is the main component of the application, and it is rendered into the root element of the HTML document. The context providers allow for state management and sharing data across components in the application.
