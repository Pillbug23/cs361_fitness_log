import React, { useState, useEffect } from "react";

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { FaFlag } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { FaFire } from "react-icons/fa";

function Calorie() {
    const [goal, setGoal] = useState(2000)
    const [food, setFood] = useState(0)
    const [exercise, setExercise] = useState(0)
    const final = food - exercise;

    function changeValues() {
        setFood(food + 300)
        setExercise(exercise + 10)
    }

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <Row>
                        <Col md={7}>
                            <h1 className="calorie-logo">Calculate Calories</h1>
                            <div className="progress-bar">
                                <CircularProgressbar maxValue={goal} value={final} text={`${final }`} />
                            </div>
                        </Col>
                        <Col md={5}>
                            <Container className="goal-format">
                                <FaFlag style={{color: "#CCCCCC"}}/> <span>Base Goal: {goal}</span>
                                <IoFastFood style={{color: "#1877F2", marginTop: "25px"}}/> <span>Food: {food}</span>
                                <FaFire style={{color: "#FF4500", marginTop: "25px"}}/> <span>Exercise: {exercise}</span>
                            </Container>
                        </Col>
                    </Row>   
                </Container>
                <Container className="content">
                    <Row>
                        <Col md={7}>
                            <h1 className="calorie-logo">Update Tracker</h1>
                            <Button onClick={() => changeValues()}> Update </Button>
                        </Col>
                    </Row>  
                </Container>
            </Container>

        </section>
    );
}

export default Calorie;