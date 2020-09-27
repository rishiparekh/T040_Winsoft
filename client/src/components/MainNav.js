import React, { useState, useCallback } from 'react'
import {Navbar,Nav,Button} from 'react-bootstrap'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStore from '../zustand/store';

function MainNav(props) {
  const { loggedIn, logout } = useStore(useCallback(state => ({loggedIn: state.loggedIn, logout: state.logout}), []))
  
  return (
    <React.Fragment>
      <Navbar style={{zIndex:10000}} sticky="top" variant="dark" bg="dark" expand="lg" >
        <Navbar.Brand href="/" >Indian Army</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="ml-auto mr-auto">
              <Nav.Link  href="/maps">
                <div >Maps</div>
              </Nav.Link>
              
            </Nav>
            <Nav className="ml-auto" style={{display:'contents'}}>
              {
                loggedIn ?
                <IconButton onClick={logout}>
                  <ExitToAppIcon style={{color:'white'}} />
                </IconButton>
                :
                <Nav.Link href="/login" className="BottomButton" >
                  <Button  variant="primary">Log in</Button>{' '}
                </Nav.Link>
              }
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  )
}

export default MainNav