import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const Register = ({ users, account, setIsUser, setIsDesigner, setIsManufacturer }) => {
    const [selectCustomer, setSelectCustomer] = useState(true)
    const [selectDesigner, setSelectDesigner] = useState(false)
    const [selectManufacturer, setSelectManufacturer] = useState(false)

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState(1)
    const [ssn, setSsn] = useState(1)
    const [location, setLocation] = useState("")


    const statusHandler = async(e) => {
        if(e.target.value == "Customer"){
            setSelectCustomer(true)
            setSelectDesigner(false)
            setSelectManufacturer(false)
            
        }else if(e.target.value == "Designer"){
            setSelectCustomer(false)
            setSelectDesigner(true)
            setSelectManufacturer(false)
        }else if(e.target.value == "Manufacturer"){
            setSelectCustomer(false)
            setSelectDesigner(false)
            setSelectManufacturer(true)
        }
    }

    const createAccount = async() => {
        if(selectCustomer){ 
            if(email == "" || name == "" || surname == "" || phone == "") return
            await users.makeCustomer(account,name,surname,phone)
            setIsUser(true)
        }else if(selectDesigner){
            if(email == "" || name == "" || surname == "" || phone == "" || ssn == "" || location == "") return
            await users.makeDesigner(account, name, surname, phone, email, ssn, location)
            setIsDesigner(true)
        }else if(selectManufacturer){
            if(email == "" || name == "" || surname == "" || phone == "" || ssn == "" || location == "") return
            await users.makeManufacturer(account, name, surname, phone, email, ssn, location)
            setIsManufacturer(true)
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
                        <Form.Control onChange={(e) => setEmail(e.target.value)} className='mb-2' required type="email" placeholder="Enter email" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={{ color: "#222831" }}>Name</h5>
                        <Form.Control onChange={(e) => setName(e.target.value)} className='mb-2' required type="text" placeholder="Name" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={{ color: "#222831" }}>Surname</h5>
                        <Form.Control onChange={(e) => setSurname(e.target.value)} className='mb-2' required type="text" placeholder="Surname" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={{ color: "#222831" }}>Phone Number</h5>
                        <Form.Control onChange={(e) => setPhone(e.target.value)} className='mb-2' required type="number" placeholder="5695537419" pattern="[1-9]{10}" style={{ borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={selectCustomer ? { display: 'none'} : { color: "#222831" }}>SSN</h5>
                        <Form.Control onChange={(e) => setSsn(e.target.value)} className='mb-2 ' type="number" placeholder="17324987515" pattern="[1-9]{11}" style={selectCustomer ? { display: 'none'} : { borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        <h5 style={selectCustomer ? { display: 'none'} : { color: "#222831" }}>Location</h5>
                        <Form.Control onChange={(e) => setLocation(e.target.value)} className='mb-2' type="text" placeholder="Ohaio/USA" style={selectCustomer ? { display: 'none'} : { borderColor: "#FFD369", backgroundColor: "#EEEEEE" }}/>                   
                        
                    </Form.Group>
                    <Form.Group className="mt-3 mb-3">
                        <Link className='pe-auto' to="/loginPage" style={{ color: "#222831" }}>
                            Already have an account
                        </Link>
                    </Form.Group>
                    <Button onClick={createAccount} className="bReverseColor pe-auto">
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