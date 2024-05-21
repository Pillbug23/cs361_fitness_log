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
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal'

import { FaFlag } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaFire } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { TbMeat } from "react-icons/tb";
import { CiWheat } from "react-icons/ci";
import { LuMilk } from "react-icons/lu";
import { FaRunning } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";

function Calorie() {
    const [goal, setGoal] = useState(2000)
    const [food, setFood] = useState(0)
    const [foodName, setFoodName] = useState('');
    const [exerciseName, setExerciseName] = useState('');
    const [searchFood, setSearchFood] = useState([]);
    const [searchExercise, setSearchExercise] = useState([]);
    const [exercise, setExercise] = useState(0)
    const [exerciseData, setExerciseData] = useState([])
    const final = food - exercise;
    const [calorieData, setCalorieData] = useState([])

    const [protein, setProtein] = useState(0)
    const [fiber, setFiber] = useState(0)
    const [fat, setFat] = useState(0)

    const [show, setShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [distance, setDistance] = useState(0)
    const [steps, setSteps] = useState(0)

    // Form data which is a useState object
    // Note some fields are set to the default values if not selected
    const [formData, setFormData] = useState({
        name: '',
        calorie: '',
        protein: '',
        fiber: '',
        fat: ''
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

    const handleClose = () => setShow(false);

    useEffect(() => {
        fetch('http://localhost:9825/calorie')
            .then(response => response.json())
            .then(data => {
                setCalorieData(data)
                totalCalories(data)
                
            })
            .catch(error => console.error('Error fetching data:', error));

    }, [calorieData])

    useEffect(() => {
        fetch('http://localhost:9825/exercise')
            .then(response => response.json())
            .then(data => {
                setExerciseData(data)
                totalExercises(data)
            })
            .catch(error => console.error('Error fetching data:', error));

    }, [exerciseData])  

    useEffect(() => {
        setDistance(exercise / 100);
      }, [exercise]);
      
      useEffect(() => {
        setSteps((distance * 5280) / 2.5);
      }, [distance]);

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
        const total = calorieData.reduce((sum, item) => sum + item.calorie, 0);
        const total_protein = calorieData.reduce((sum, item) => sum + item.protein, 0);
        const total_fiber = calorieData.reduce((sum, item) => sum + item.fiber, 0);
        const total_fat = calorieData.reduce((sum, item) => sum + item.fat, 0);
        setFood(total);
        setProtein(total_protein);
        setFiber(total_fiber);
        setFat(total_fat);
    }

    const totalExercises = (exerciseData) => {
        if (exerciseData.length == 0) {
            return
        }
        const total = exerciseData.reduce((sum, item) => sum + item.burned, 0);
        setExercise(total);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setFormData2({ ...formData2, [name]: value });
    };

    const handleFoodChange = (e) => {
        setFoodName(e.target.value)
    };

    const handleExerciseChange = (e) => {
        setExerciseName(e.target.value)
    };

    const openModal = (item) => {
        setSelectedItem(item);
        setShow(true)
    }

    // On submit prevent webpage reload and check conditions
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9825/calorie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setFormData({
                    name: '',
                    calorie: '',
                    protein: '',
                    fiber: '',
                    fat: ''
                })
            }
        } catch (error) {
            console.error('Could not add login', error);
        }
    };

    // On submit prevent webpage reload and check conditions
    const fetchFood = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9825/calorie/search?name=${foodName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json()
                setSearchFood(data)
            }
        } catch (error) {
            console.error('Could not add login', error);
        }
    };

    // On submit prevent webpage reload and check conditions
    const fetchExercise = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9825/exercise/search?name=${exerciseName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json()
                setSearchExercise(data)
            }
        } catch (error) {
            console.error('Could not add login', error);
        }
    };

    // On submit prevent webpage reload and check conditions
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:9825/exercise', {
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
                fetch('http://localhost:9825/exercise')
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
        fetch('http://localhost:9825/delete-calories', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:9825/calorie')
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
        fetch('http://localhost:9825/delete-exercises', {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    fetch('http://localhost:9825/exercise')
                        .then(response => response.json())
                        .then(data => {
                            setExerciseData(data)
                            setExercise(0)
                        })
                        .catch(error => console.error('Error fetching data:', error));

                }
            })

    };

    const sortAlphabetically = (data, updateData) => {
        const sortedArray = [...data].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
        updateData(sortedArray)
    };

    const filterByMaxCalories = (data, updateData) => {
        const filteredArray = [...data].sort((a, b) => b.calorie - a.calorie);
        updateData(filteredArray);
    };

    const filterByMinCalories = (data, updateData) => {
        const filteredArray = [...data].sort((a, b) => a.calorie - b.calorie);
        updateData(filteredArray);
    }

    const filterByMaxCalories2 = (data, updateData) => {
        const filteredArray = [...data].sort((a, b) => b.burned - a.burned);
        updateData(filteredArray);
    };

    const filterByMinCalories2 = (data, updateData) => {
        const filteredArray = [...data].sort((a, b) => a.burned - b.burned);
        updateData(filteredArray);
    }

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <Row>
                        <Col md={4} >
                            <h1 className="calorie-logo">Calculate Calories</h1>
                            <div className="progress-bar">
                                <CircularProgressbar maxValue={goal} value={final} text={`${final}`} />
                            </div>
                        </Col>
                        <Col md={4}>
                            <Container className="goal-format">
                                <FaFlag style={{ color: "#CCCCCC" }} /> <span>Base Goal: {goal}</span>
                                <IoFastFood style={{ color: "#1877F2", marginTop: "25px" }} /> <span>Food: {food}</span>
                                <FaFire style={{ color: "#FF4500", marginTop: "25px" }} /> <span>Exercise: {exercise}</span>
                                <TbMeat style={{ color: "#B22222", marginTop: "25px" }} /> <span>Protein: {protein}g</span>
                                <CiWheat style={{ color: "#F4A460", marginTop: "25px" }} /> <span>Fiber: {fiber}g</span>
                                <LuMilk style={{ color: "#F0EAD6", marginTop: "25px" }} /> <span>Fat: {fat}g</span>
                            </Container>
                        </Col>
                        <Col md={4}>
                            <Container className="goal-format">
                                <FaRunning style={{ marginTop: "25px" }} /> <span>Distance Travelled: {distance}mi</span>
                                <IoFootsteps style={{ marginTop: "25px" }} /> <span>Steps Taken: {steps}</span>
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

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Protein (g)</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Protein in Grams" name="protein" value={formData.protein} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Fiber (g)</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Fiber in Grams" name="fiber" value={formData.fiber} onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Fat (g)</Form.Label>
                                    <Form.Control type="number" placeholder="Enter Fat in Grams" name="fat" value={formData.fat} onChange={handleChange} required />
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
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter food name"
                                    aria-label="food"
                                    aria-describedby="basic-addon1"
                                    onChange={handleFoodChange}
                                    value={foodName}
                                />
                                <Button onClick={fetchFood}>Search</Button>
                            </InputGroup>
                            {searchFood.map((item, index) => {
                                return (
                                    <Card className="calorie-style" key={index} style={{ width: '19rem', margin: '2px' }} onClick={() => openModal(item)}>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Subtitle>Calories: {item.calorie}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>)
                            })}
                            <div className="horizontal-line"></div>
                            <Button style={{ marginBottom: '10px' }} onClick={() => handleDelete()}> Delete All Entries</Button>

                            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                {calorieData.map((item, index) => {
                                    return (
                                        <Card className="calorie-style" key={index} style={{ width: '19rem', margin: '2px' }} onClick={() => openModal(item)}>
                                            <Card.Body>
                                                <Card.Title>{item.name}</Card.Title>
                                                <Card.Subtitle>Calories: {item.calorie}</Card.Subtitle>
                                            </Card.Body>
                                        </Card>)
                                })}
                                <Button style={{ margin: '10px' }} onClick={() => sortAlphabetically(calorieData, setCalorieData)}> Sort Alphabetically</Button>
                                <Button style={{ margin: '10px' }} onClick={() => filterByMaxCalories(calorieData, setCalorieData)}> Sort By Max Calories</Button>
                                <Button style={{ margin: '10px' }} onClick={() => filterByMinCalories(calorieData, setCalorieData)}> Sort By Min Calories</Button>
                            </div>

                            {selectedItem && (
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{selectedItem.name}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>Calories: {selectedItem.calorie}</p>
                                        <p>Protein: {selectedItem.protein}</p>
                                        <p>Fiber: {selectedItem.fiber}</p>
                                        <p>Fat: {selectedItem.fat}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )}
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
                            <h1 className="calorie-logo">View Exercise Entries <FaFileAlt /></h1>
                            <p>Here you are able to view all exercise entries currently added.
                            </p>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                                <Form.Control
                                    placeholder="Enter exercise name"
                                    aria-label="exercise"
                                    aria-describedby="basic-addon1"
                                    onChange={handleExerciseChange}
                                    value={exerciseName}
                                />
                                <Button onClick={fetchExercise}>Search</Button>
                            </InputGroup>
                            {searchExercise.map((item, index) => {
                                return (
                                    <Card key={index} style={{ width: '19rem', margin: '2px' }} >
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Subtitle>Calories: {item.burned}</Card.Subtitle>
                                        </Card.Body>
                                    </Card>)
                            })}
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
                                <Button style={{ margin: '10px' }} onClick={() => sortAlphabetically(exerciseData, setExerciseData)}> Sort Alphabetically</Button>
                                <Button style={{ margin: '10px' }} onClick={() => filterByMaxCalories2(exerciseData, setExerciseData)}> Sort By Max Calories</Button>
                                <Button style={{ margin: '10px' }} onClick={() => filterByMinCalories2(exerciseData, setExerciseData)}> Sort By Min Calories</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </section>
    );
}

export default Calorie;