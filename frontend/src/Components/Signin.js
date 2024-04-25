import React, { useState, useEffect } from 'react'

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Signin() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    // Google log out function
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    // handleChange arrow function called everytime a field is filled out
    // Destructure e.target which has name,target
    // update state with the previous formData object and new attribute:value pair
    const handleChange =(e) => {
        const {name, value} = e.target
        setFormData({...formData,[name]: value});
    }


    // On submit prevent webpage reload and check conditions
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("yes")
        try {
            const response = await fetch('http://localhost:4283/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle success
                console.log('Logged in successfully');
                const data = await response.json()
                console.log(data)
                setFormData({
                    email: '',
                    password: ''                   
                })
                setProfile(data)
            }
        } catch (error) {
            console.error('Could not find login', error);
        }
    };

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    {profile ? (<Row>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={profile.picture}/>
                                <Card.Body>
                                    <Card.Title>{profile[0].name}</Card.Title>
                                    <Card.Title>{profile[0].email}</Card.Title>
                                    <Card.Text>
                                        Feel free to change your profile description
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Button onClick={logOut} style={{marginTop: "20px"}}>Log out</Button>
                        </Col>
                    </Row>) : (
                        <><h1 className="signup-logo">Sign In</h1>
                            <Row>
                                <Col md={9}>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleChange} required/>
                                        </Form.Group>


                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                    <div className="horizontal-line"></div>
                                    <Button onClick={login}>Sign in with Google 🚀 </Button>
                                </Col>
                            </Row></>

                    )}
                </Container>
            </Container>
        </section>
    );
}

export default Signin