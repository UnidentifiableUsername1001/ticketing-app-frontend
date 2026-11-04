import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { HttpError } from './utils/errors.js';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      
      if(error instanceof HttpError) {
        if (error.status === 401) {
          sessionStorage.removeItem('auth-token');

          window.location.replace('/login');
          return;
        }

        if (error.status) {
          
          console.error('Forbidden: User lacks permissions for this resource.');
        }
      } else {
        
        console.error('Non-HTTP error occurred:', error.message);
      }
    }
  })
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>  
      </Router>
    </QueryClientProvider>
  </StrictMode>
)
