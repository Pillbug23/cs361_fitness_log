import React from "react";

/*Import components from react-bootstrap */
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Homepage() {
  return (
    <section>
      <Container fluid className="homepage-basic-info" id="home">
        <Container className="homepage-content">
          <Row>
            <Col md={7}>
              <p className="homepage-introduction">
                <h1>About</h1>
                The Fitness Tracker application allows the user 
                to add and read various exercises and foods logged. One can also view and track their
                weight progress, login, and view profile information.
              </p>
            </Col>
          </Row>
         
        </Container>
      </Container>
    </section>
  );
}

export default Homepage;