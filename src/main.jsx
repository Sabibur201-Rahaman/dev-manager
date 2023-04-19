import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './routes/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './contacts/Contact';
import { ContactProvider } from './context/Contact.Context';
import { AuthProvider } from './context/Auth.Context';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <AuthProvider>
<ContactProvider>
    <App/>
</ContactProvider>
</AuthProvider>
</BrowserRouter>


)
