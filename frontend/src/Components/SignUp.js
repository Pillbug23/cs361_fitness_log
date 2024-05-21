import React, { useState, useEffect } from "react";

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';

function SignUp() {
    // Form data which is a useState object
    // Note some fields are set to the default values if not selected
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: ''
    });

    const [added, setAdded] = useState(false)

    // handleChange arrow function called everytime a field is filled out
    // Destructure e.target which has name,target
    // update state with the previous formData object and new attribute:value pair
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // On submit prevent webpage reload and check conditions
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9825/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle success
                console.log('Login added successfully');
                setFormData({
                    name: '',
                    password: '',
                    email: ''
                })
                setAdded(!added)
            }
        } catch (error) {
            console.error('Could not add login', error);
        }
    };

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <h1 className="signup-logo">Sign Up</h1>
                    {added && (<><Alert variant={'success'}>
                        You have successfully signed up! Please log in.
                    </Alert>
                    </>)}
                    <Row>
                        <Col md={9}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="name" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    );
}

export default SignUp;