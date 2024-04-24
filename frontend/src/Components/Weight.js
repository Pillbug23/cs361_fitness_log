import React, { useState } from 'react'
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

function Weight() {
    const [data, setData] = useState([
        ["Date", "Sales"],
        ["4/24", 170],
        ["4/30", 160],
        ["5/7", 150],
        ["5/14", 145],
    ]);

    const [date, setDate] = useState(0);
    const [weight, setWeight] = useState(0);

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

    const [value, setValue] = useState(50); // Initial value for the slider

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert weight to number
        const weightNumber = parseFloat(weight);

        // Append new result array to existing array
        setData(prevData => [...prevData, [date, weightNumber]]);

        // Clear forms
        setDate('');
        setWeight('');
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
                                data={data}
                                options={options}

                            />
                            <Slider
                                name="slide"
                                id="slide"
                                valueLabelDisplay="auto"
                                aria-label="term slider"
                                defaultValue={100}
                                onChange={handleChange}
                                min={1}
                                max={500}
                                marks={marks}
                                color="secondary"
                            />
                            <h2>Goal Weight: {value}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Current Weight</Form.Label>
                                    <Form.Control type="weight" placeholder="Current Weight in lbs" value={weight} onChange={(e) => setWeight(e.target.value)} required/>
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


