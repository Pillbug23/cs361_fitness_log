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

function Weight() {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([["Date", "Weight"]])

    const [weight, setWeight] = useState(0);
    const [goal, setGoal] = useState(false);
    const [previousValue, setPreviousValue] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4283/weight');
            if (response.ok) {
                const data = await response.json();
                const formattedData = data.map(obj => Object.values(obj)); // Convert fetched data to array format
                const formattedDate = formattedData.map(obj => {
                    const formattedDate = obj[0].slice(0, 10); // Extract the first 10 characters
                    return [formattedDate, obj[1]];
                })

                formattedDate.sort((a, b) => {
                    // Convert the date strings to Date objects for comparison
                    const dateA = new Date(a[0]);
                    const dateB = new Date(b[0]);

                    // Compare the dates
                    return dateA - dateB;
                });

                setData2(prevData => [...prevData, ...formattedDate.slice(-1)]); // Append fetched data to existing data
                console.log(data2)
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Form data which is a useState object
    // Note some fields are set to the default values if not selected
    const [formData, setFormData] = useState({
        date: '',
        weight: ''
    });

    const [previousFormData, setPreviousFormData] = useState(null); // State to store previous form data

    const marks = [
        {
            value: 1,
            label: '1lb',
        },
        {
            value: 100,
            label: '100lb',
        },
        {
            value: 200,
            label: '200lb',
        },
        {
            value: 300,
            label: '300lb',
        },
        {
            value: 400,
            label: '400lb',
        },
        {
            value: 500,
            label: '500lb',
        },
    ];
    ;

    const options = {
        title: "Weight",
        curveType: "function",
        legend: { position: "bottom" },
    };

    const [value, setValue] = useState(250); // Initial value for the slider
    const handleUndo = () => {
        setFormData(previousFormData)
    };


    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
    };



    // handleChange arrow function called everytime a field is filled out
    // Destructure e.target which has name,target
    // update state with the previous formData object and new attribute:value pair
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.weight == value) {
            setGoal(!goal)
        }
        // Convert weight to number
        const weightNumber = parseFloat(weight);
        try {
            const response = await fetch('http://localhost:4283/weight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle success
                setPreviousFormData(formData)
                setFormData({
                    date: '',
                    weight: '',
                })
                fetchData()
            }
        } catch (error) {
            console.error('Could not add student', error);
        }
    };

    function handleDelete() {
        fetch('http://localhost:4283/delete-weights', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetchData()
                }
            })

    };


    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <Row>
                        <Col>
                            <Chart
                                chartType="LineChart"
                                width="100%"
                                height="500px"
                                legendToggle
                                data={data2}
                                options={options}

                            />
                            <Slider
                                name="slide"
                                id="slide"
                                valueLabelDisplay="auto"
                                aria-label="term slider"
                                value={value}
                                defaultValue={250}
                                onChange={handleSliderChange}
                                min={1}
                                max={500}
                                marks={marks}
                                color="secondary"
                            />
                            <Button style={{ marginBottom: '10px' }} onClick={() => handleDelete()}> Delete All Entries</Button>
                            <h2>Goal Weight: {value}</h2>
                            {goal && (<><Alert variant={'success'}>
                                You have successfully hit your goal weight!
                            </Alert>
                            </>)}
                            <Button onClick={handleUndo}>Redo Entry </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" value={formData.date} name="date" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Current Weight</Form.Label>
                                    <Form.Control type="weight" placeholder="Current Weight in lbs" value={formData.weight} name="weight" onChange={handleChange} required />
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
    )
}

export default Weight


