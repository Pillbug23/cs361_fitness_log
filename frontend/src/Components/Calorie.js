import React, { useState, useEffect } from "react";

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Card from 'react-bootstrap/Card';
import { FaFileAlt } from "react-icons/fa";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Scrollspy from 'react-scrollspy'
import Slider, { SliderThumb } from '@mui/material/Slider';

import { FaFlag } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

function Calorie() {
    const [goal, setGoal] = useState(2000)
    const [food, setFood] = useState(0)
    const [exercise, setExercise] = useState(0)
    const [exerciseData, setExerciseData] = useState([])
    const final = food - exercise;
    const [calorieData, setCalorieData] = useState([])
    // Form data which is a useState object
    // Note some fields are set to the default values if not selected
    const [formData, setFormData] = useState({
        name: '',
        calorie: ''
    });

    const [formData2, setFormData2] = useState({
        name: '',
        burned: ''
    });

    const marks = [
        {
            value: 500,
            label: '500c',
        },
        {
            value: 1000,
            label: '1000c',
        },
        {
            value: 1500,
            label: '1500c',
        },
        {
            value: 2000,
            label: '2000c',
        },
        {
            value: 2500,
            label: '2500c',
        },
        {
            value: 3000,
            label: '3000c',
        },
        {
            value: 3500,
            label: '3500c',
        },
        {
            value: 4000,
            label: '4000c',
        },
        {
            value: 4500,
            label: '4500c',
        },
        {
            value: 5000,
            label: '5000c',
        },
    ];
    ;

    const handleSliderChange = (event, newValue) => {
        setGoal(newValue)
    };

    useEffect(() => {
        fetch('http://localhost:4283/calorie')
            .then(response => response.json())
            .then(data => {
                setCalorieData(data)
                totalCalories(data)
            })
            .catch(error => console.error('Error fetching data:', error));

    }, [])

    useEffect(() => {
        fetch('http://localhost:4283/exercise')
            .then(response => response.json())
            .then(data => {
                setExerciseData(data)
                totalExercises(data)
            })
            .catch(error => console.error('Error fetching data:', error));

    }, [])

    const calculateCalories = (calorieData) => {
        if (calorieData.length == 0) {
            return
        }
        const calorie_item = calorieData[calorieData.length - 1].calorie
        setFood(food + calorie_item)
    }

    const calculateExercises = (exerciseData) => {
        if (exerciseData.length == 0) {
            return
        }
        const exercise_item = exerciseData[exerciseData.length - 1].burned
        setExercise(exercise + exercise_item)
    }

    const totalCalories = (calorieData) => {
        if (calorieData.length == 0) {
            return
        }
        calorieData.map((item) => {
            setFood(food + item.calorie)
        })
    }

    const totalExercises = (exerciseData) => {
        if (exerciseData.length == 0) {
            return
        }
        exerciseData.map((item) => {
            setExercise(exercise + item.burned)
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2({ ...formData2, [name]: value });
    };

    // On submit prevent webpage reload and check conditions
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4283/calorie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({
                    name: '',
                    calorie: ''
                })
                fetch('http://localhost:4283/calorie')
                    .then(response => response.json())
                    .then(data => {
                        setCalorieData(data)
                        calculateCalories(data)
                    })
                    .catch(error => console.error('Error fetching data:', error));

            }
        } catch (error) {
            console.error('Could not add login', error);
        }
    };

    // On submit prevent webpage reload and check conditions
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4283/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData2)
            });
            if (response.ok) {
                setFormData2({
                    name: '',
                    burned: ''
                })
                fetch('http://localhost:4283/exercise')
                    .then(response => response.json())
                    .then(data => {
                        setExerciseData(data)
                        calculateExercises(data)
                    })
                    .catch(error => console.error('Error fetching data:', error));

            }
        } catch (error) {
            console.error('Could not add login', error);
        }
    };

    function handleDelete() {
        fetch('http://localhost:4283/delete-calories', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:4283/calorie')
                        .then(response => response.json())
                        .then(data => {
                            setCalorieData(data)
                            setFood(0)
                        })
                        .catch(error => console.error('Error fetching data:', error));

                }
            })

    };

    function handleDelete2() {
        fetch('http://localhost:4283/delete-exercises', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:4283/exercise')
                        .then(response => response.json())
                        .then(data => {
                            setExerciseData(data)
                            setExercise(0)
                        })
                        .catch(error => console.error('Error fetching data:', error));

                }
            })

    };

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <Row>
                        <Col md={7} >
                            <h1 className="calorie-logo">Calculate Calories</h1>
                            <div className="progress-bar">
                                <CircularProgressbar maxValue={goal} value={final} text={`${final}`} />
                            </div>
                        </Col>
                        <Col md={5}>
                            <Container className="goal-format">
                                <FaFlag style={{ color: "#CCCCCC" }} /> <span>Base Goal: {goal}</span>
                                <IoFastFood style={{ color: "#1877F2", marginTop: "25px" }} /> <span>Food: {food}</span>
                                <FaFire style={{ color: "#FF4500", marginTop: "25px" }} /> <span>Exercise: {exercise}</span>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container className="content">
                    <Row>
                        <Col md={12} >
                            <h1>Change Goal</h1>
                            <p>First adjust the slider below to set your own calorie goals!</p>
                            <Slider
                                name="slide"
                                id="slide"
                                valueLabelDisplay="auto"
                                aria-label="term slider"
                                defaultValue={2500}
                                onChange={handleSliderChange}
                                min={1}
                                max={5000}
                                marks={marks}
                            />
                        </Col>
                    </Row>
                </Container>
                <Container className="content">
                    <Row>
                        <Col md={6}>
                            <h1 className="calorie-logo">Add Food Entry <MdFastfood /></h1>
                            <p>Then add a food entry by entering the name of the food, and its
                                calorie count into the below input fields. Submitting the Food
                                will allow you to see what calories are left in the above progress bar.
                            </p>
                            <Form onSubmit={handleSubmit} className="form-calorie">
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Food Name</Form.Label>
                                    <Form.Control type="name" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Calorie Count</Form.Label>
                                    <Form.Control type="number" placeholder="Num. Calories of item" name="calorie" value={formData.calorie} onChange={handleChange} required />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col md={6} >
                            <h1 className="calorie-logo">View Food Entries <FaFileAlt /></h1>
                            <p>Here you are able to view all food entries currently added.
                            </p>
                            <div className="horizontal-line"></div>
                            <Button style={{ marginBottom: '10px' }} onClick={() => handleDelete()}> Delete All Entries</Button>
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                {calorieData.map((item, index) => {
                                    return (
                                        <Card key={index} style={{ width: '19rem', margin: '2px' }} >
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Subtitle>Calories: {item.calorie}</Card.Subtitle>
                                            </Card.Body>
                                        </Card>)
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container className="content">
                    <Row>
                        <Col md={6}>
                            <h1 className="calorie-logo">Add Exercise Entry <FaFire /></h1>
                            <p>Finally add a exercise entry by entering the exercise name, and its
                                calorie count burned into the below input fields. Submitting the Exercise
                                will allow you to see what calories you burned in the above progress bar.
                            </p>
                            <Form onSubmit={handleSubmit2} className="form-calorie">
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Exercise Name</Form.Label>
                                    <Form.Control type="name" placeholder="Full Name" name="name" value={formData2.name} onChange={handleChange2} required />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Calorie Count</Form.Label>
                                    <Form.Control type="number" placeholder="Num. Calories Burned" name="burned" value={formData2.burned} onChange={handleChange2} required />
                                </Form.Group>
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col md={6} >
                            <h1 className="calorie-logo">View ExerciseEntries <FaFileAlt /></h1>
                            <p>Here you are able to view all exercise entries currently added.
                            </p>
                            <div className="horizontal-line"></div>
                            <Button style={{ marginBottom: '10px' }} onClick={() => handleDelete2()}> Delete All Entries</Button>
                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                {exerciseData.map((item, index) => {
                                    return (
                                        <Card key={index} style={{ width: '19rem', margin: '2px' }} >
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Subtitle>Calories: {item.burned}</Card.Subtitle>
                                            </Card.Body>
                                        </Card>)
                                })}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </section>
    );
}

export default Calorie;