import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { IoWater } from "react-icons/io5";
import { MdAirlineSeatLegroomExtra } from 'react-icons/md';

function Water() {
    const [data, setData] = useState([]);
    const [amount, setAmount] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:9825/water');
            if (response.ok) {
                const data_water = await response.json();
                setData(data_water)
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Side effect for loading component after each render
    // Data is loaded once on load 
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        calculateCups(data);
    }, [data])

    // Form data which is a useState object
    // Note some fields are set to the default values if not selected
    const [formData, setFormData] = useState({
        cup: ''
    });

    // Calculate total amount of cups drank
    const calculateCups = (data) => {
        if (data.length == 0) {
            return
        }
        const total = data.reduce((sum, item) => sum + item.cup, 0);
        setAmount(total)
    }
    // handleChange arrow function called everytime a field is filled out
    // Destructure e.target which has name,target
    // update state with the previous formData object and new attribute:value pair
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9825/water', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle success
                setFormData({
                    cup: ''
                })
                fetchData()
            }
        } catch (error) {
            console.error('Could not add student', error);
        }
    };

    function handleDelete() {
        fetch('http://localhost:9825/delete-water', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setAmount(0)
                }
            })

    };


    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <Row style={{ marginBottom: "30px" }}>
                        <Col>
                            {amount >= 16 && (<Alert key="success" variant="success">
                                Congrats! You've met your water intake quota for today!
                            </Alert>)}
                            <h1> <IoWater /> Water Intake Progress Bar</h1>
                            <p> It's recommended to drink around 15.5 cups of water per day.
                                Here you can update the amount of cups you've drank throughout
                                the day and submit the cups you drank to update the progress
                                bar. When you've drank 16 cups, the progress bar is complete and
                                will display a completion message!
                            </p>
                            <ProgressBar animated style={{ height: "100px" }} now={amount} max={16} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Cups Intaked (Amount of Cups of Water Consumed)</Form.Label>
                                    <Form.Control type="text" value={formData.cup} name="cup" onChange={handleChange} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{ marginBottom: "20px" }}>
                                    Submit
                                </Button>
                            </Form>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Button variant="danger" onClick={() => handleDelete()}>
                                Reset Water Daily Intake
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </section>
    )
}

export default Water
