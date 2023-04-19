import React from 'react'
import{Nav,Navbar,Button,Container,Form} from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
function Header() {
  const{logOut,user}=useContext(AuthContext)
  return (
    <div className='container' >
       <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Dev-manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {user&&(
            <>
            <Nav.Link as={NavLink} to='/contacts'>Contacts</Nav.Link>
            <Nav.Link as ={NavLink} to='/add-contacts'>AddContacts</Nav.Link>
            <Nav.Link as ={NavLink} to='/dashboard'>Dashboard</Nav.Link>
            <Nav.Link onClick={logOut}>logout</Nav.Link>
            
            </>
            )}
            {!user&&(
           <>
            <Nav.Link as ={NavLink} to='/Login'>Login</Nav.Link>
            
            <Nav.Link as ={NavLink} to='/Register'>Register</Nav.Link>
           </> 
            )}
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
             Login
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
