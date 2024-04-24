import React, { useState, useEffect } from 'react'

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';

import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Signin() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

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

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    {profile ? (<Row>
                        <Col>
                            <Card style={{ width: '24rem' }}>
                                <Card.Img variant="top" src={profile.picture}/>
                                <Card.Body>
                                    <Card.Title>{profile.name}</Card.Title>
                                    <Card.Title>{profile.email}</Card.Title>
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
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Email address" />
                                        </Form.Group>


                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" />
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