import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Register = () => {
    const [selectCustomer, setSelectCustomer] = useState(true)
    const statusHandler = (e) => {
        if(e.target.value == "Customer"){
            setSelectCustomer(true)
        }else{
            setSelectCustomer(false)
        }
    }
    return(
        <>
        <Row className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
            <Col></Col>
            <Col className='p-5' style={{ backgroundColor: "#EEEEEE" }} xs={6}>
                <Form>
                    <Form.Group className="mb-2">
                        <Form.Select onChange={statusHandler} style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}>
                          <option>Customer</option>
                          <option>Designer</option>
                          <option>Manufacturer</option>
                        </Form.Select>
                        <h5 style={{ color: "#222831" }}>Email address</h5>
                        <Form.Control className='mb-2 ' required type="email" placeholder="Enter email" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={{ color: "#222831" }}>Name</h5>
                        <Form.Control className='mb-2 ' required type="text" placeholder="Name" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={{ color: "#222831" }}>Surname</h5>
                        <Form.Control className='mb-2 ' required type="text" placeholder="Surname" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={{ color: "#222831" }}>Phone Number</h5>
                        <Form.Control className='mb-2 ' required type="tel" placeholder="569 553 8215" pattern="[1-9]{3} [0-9]{3} [0-9]{4}" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={selectCustomer ? { display: 'none'} : { color: "#222831" }}>SSN</h5>
                        <Form.Control className='mb-2 ' required type="SSN" placeholder="17324987515" pattern="[1-9]{11}" style={selectCustomer ? { display: 'none'} : { borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={selectCustomer ? { display: 'none'} : { color: "#222831" }}>Location</h5>
                        <Form.Control className='mb-2 ' required type="text" placeholder="Ohaio/USA" style={selectCustomer ? { display: 'none'} : { borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3">
                        <Link className='pe-auto' to="/loginPage" style={{ color: "#222831" }}>
                            Already have an account
                        </Link>
                    </Form.Group>
                    <Button className="bReverseColor pe-auto" type="submit">
                      Register
                    </Button>
                </Form>
            </Col>
            <Col></Col>
        </Row>
        </>
    )
}

export default Register