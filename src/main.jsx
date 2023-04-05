import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Contact from './contacts/Contact';
import { ContactProvider } from './context/Contact.Context';

ReactDOM.createRoot(document.getElementById('root')).render(
<ContactProvider>
    <App/>
</ContactProvider>


)
