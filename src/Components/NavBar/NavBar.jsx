import "./NavBar.scss"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from "../../Contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

function NavBar() {

  const { success, setFailedAuth, setUser } = useContext(AuthContext)

  const navigate = useNavigate();

  //Sign user out.
  const handleLogout = () => {
    setFailedAuth(true);
    setUser(null);
    sessionStorage.removeItem('authToken');
    message.success('Log Out successful', 2);
    navigate('/')
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="nav__title" href="/">PartsBin </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/bikes">Bikes</Nav.Link>
              <Nav.Link href="/components">Components</Nav.Link>
              <Nav.Link href="/upload">Post Add</Nav.Link>

              {/* conditional if user signed in Chat button link appears */}
              {success ? (<div>
                <>
                  <Nav.Link href='/chatdashboard' className="nav__message-button" >
                    {/* <MessageOutlined className="nav__message-icon"/> */}
                    <h3 className="nav__message-text">Messages</h3>
                  </Nav.Link>
                </>
              </div>) : (
                <></>
              )}

              <div>
                {/* Conditional to display login or logout button */}
                {success ? (
                  <div>
                    <button className="nav__button" onClick={handleLogout} >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  );
}

export default NavBar;