import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


const LoginPage = () => {
    return(
        <>
        <Row className="d-flex justify-content-center align-items-center" style={{ height: "500px" }}>
            <Col></Col>
            <Col className='p-5' style={{ backgroundColor: "#EEEEEE" }} xs={6}>
                <Form>
                    <Form.Group className="mb-2">
                        <h5 style={{ color: "#222831" }}>Email address</h5>
                        <Form.Control className='mb-2 ' required type="email" placeholder="Enter email" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <Form.Select  style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}>
                          <option>Customer</option>
                          <option>Designer</option>
                          <option>Manufacturer</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3">
                        <Link className='pe-auto' to="/registerPage" style={{ color: "#222831" }}>
                            Don't have an account
                        </Link>
                    </Form.Group>
                    <Button className="bReverseColor pe-auto" type="submit">
                      Login
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
        </>
    )
}

export default LoginPage