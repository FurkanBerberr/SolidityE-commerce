import { Button, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"


const Home = ({ web3Handler, account }) => {
    return(
        <div>
            home page
            {account ? (
                <Nav>
                    <Nav.Link
                        as={Link} 
                        to="/loginPage"
                        rel="noopener noreferrer"
                        className="button nav-button btn-sm mx-4">
                        <Button className="bColor">Login/Register</Button>
                    </Nav.Link>
                </Nav>
            ) : (
                <Nav.Link
                    as={Link} 
                    to="/loginPage"
                    rel="noopener noreferrer"
                    className="button nav-button btn-sm mx-4">
                    <Button onClick={web3Handler} className="bColor">Connect Wallet</Button>
                </Nav.Link>
            )}
        </div>
    )

}

export default Home