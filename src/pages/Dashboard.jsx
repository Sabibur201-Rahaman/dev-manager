import React from 'react'
import { Outlet,NavLink} from 'react-router-dom'
import { ListGroup,Col,Row,Tab, } from 'react-bootstrap'
function Dashboard() {
  return (
   <>
      <h2 className='mt-5 text-center'>hello from Dashboard </h2>
      
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action as={NavLink} to="profile">
              profile
            </ListGroup.Item>
            <ListGroup.Item action as={NavLink} to="manage-password">
              Manage Password
            </ListGroup.Item>
            <ListGroup.Item action as={NavLink} to="contacts">
              contacts
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
          <Outlet/>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
   </>
  )
}
export default Dashboard
