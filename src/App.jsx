import { useState,useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Contacts from './contacts/Contacts'
import Header from './layouts/Header'
import AddContacts from './contacts/AddContacts'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import EditContact from './pages/EditContact'
import AddContact from './pages/AddContact'
import ContactDetails from './pages/ContactDetails'
import { Container } from 'react-bootstrap'

const initialState=[
  {
    "id": '1',
    "first_name": "Petr",
    "last_name": "Hansmann",
    'profession':'webdeveloper',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "phansmann0@comcast.net",
    "gender": "male",
    "dob": "29/12/1987",
    "picture": "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    "id": '2',
    "first_name": "Shayne",
    "last_name": "Ceyssen",
    'profession':'webdisigner',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "sceyssen1@marriott.com",
    "gender": "male",
    "dob": "26/12/1992",
    "picture": "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    "id": '3',
    "first_name": "Nichole",
    "last_name": "Bance",
    'profession':'Architect',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "nbance2@moonfruit.com",
    "gender": "female",
    "dob": "11/09/1986",
    "picture": "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    "id": '4',
    "first_name": "Townsend",
    "last_name": "Maase",
    'profession':'SoftwareEngineer',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "tmaase3@globo.com",
    "gender": "male",
    "dob": "19/04/1983",
    "picture": "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    "id": '5',
    "first_name": "Ethelred",
    "last_name": "Gulliford",
    'profession':'SoftwareDeveloper',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "egulliford4@yahoo.com",
    "gender": "male",
    "dob": "14/01/1979",
    "picture": "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    "id": '6',
    "first_name": "Berny",
    "last_name": "Frackiewicz",
    'profession':'Bloger',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "bfrackiewicz5@pbs.org",
    "gender": "female",
    "dob": "27/11/1996",
    "picture": "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    "id": '7',
    "first_name": "Amelina",
    "last_name": "Stubbs",
    'profession':'Developer',
    'bio':' it reveals and displays your life and career’s major accomplishments. Such can be beneficial in finding opportunities, landing jobs and promoting your consulting business.',
    "email": "astubbs6@shop-pro.jp",
    "gender": "female",
    "dob": "19/09/1995",
    "picture": "https://randomuser.me/api/portraits/women/7.jpg"
  },
]

function App() {
  const [contacts, setContacts] = useState(initialState)
  


  return (
    <>
   
      <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      <BrowserRouter>
      <Container style={{width:'1000px',margin:'0 auto'}} >
        <Routes>
          <Route path='/' index element={<Home/>}/>

          <Route path='/contacts' element={<Contacts/>}/>
          {/* <Route path='/add-contacts' element={<AddContacts addContacts={addContacts}/>}/> */}
          <Route path='/Register' element={<Register/>}/>
          <Route path='/contacts/:id' element={<ContactDetails/>}/>
          <Route path='/edit-contact/:id' element={<EditContact />}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/add-contacts' element={<AddContact/>}/>
          <Route path='/*' element={<NotFound/>}/>
        
    
        </Routes>
    <Header/>
    
    </Container>
    </BrowserRouter>
    
    </>
  )
}

export default App
