import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import logo from "../../public/logo.png"
import "./NavigationBar.css"
import { useState } from "react";

const NavigationBar = ({ account, loading, users }) => {
    const[isCustomer, setIsCustomer] = useState(true)
    
    const f = async () => {
        const c_role = await users.CUSTOMER_ROLE()
        const isCustomer = await users.hasRole(c_role, account)
        setIsCustomer(isCustomer)
    }

    return (
        <Navbar expand="lg" variant="dark" className="customNav">
            <Container>
                <Navbar.Brand style={{color: "#FFD369"}}>
                    <img src={logo} width="40" height="40" className="" alt="" />
                    &nbsp; Market Place
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                        {loading ? (
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/create">Create</Nav.Link>
                                <Nav.Link as={Link} to="/my-listed-items">My Listed Items</Nav.Link>
                                <Nav.Link as={Link} to="/my-purchases">My Purchases</Nav.Link>
                                {console.log(f(), isCustomer)}
                            </Nav>
                        )}
                    <Nav>
                        <Nav.Link
                            as={Link} 
                            to="/profile"
                            rel="noopener noreferrer"
                            className="button nav-button btn-sm mx-4">
                            <Button className="bColor">
                                {account.slice(0, 5) + '...' + account.slice(38, 42)}
                            </Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar