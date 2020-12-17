import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './Context/AuthenticationCtxt'

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,    
  document.getElementById('root')
);

