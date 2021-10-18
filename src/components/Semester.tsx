import React from "react";
import { Button, Card as BootstrapCard, Col, Row } from "react-bootstrap";
import Course from "./Course";

export function Semester(): JSX.Element {
    return ( <BootstrapCard className="border-dark">
        <Col>
            <div className="semester-title">
                <strong>Fall Semester</strong>
            </div>
            <Row>
                <Col><strong>Course ID</strong></Col>
                <Col><strong>Course Name</strong></Col>
                <Col><strong>Description</strong></Col>
                <Col><strong>Credits</strong></Col>
                <Col><strong>Click Here to Edit Course</strong></Col>
            </Row>
            <Row>
                <Course id={"CISC275"} name={"Intro to Software Engineering"} description={"Course1"} credits={3}></Course>
            </Row>
            <Row>
                <Course id={"CISC106"} name={"Intro to Computer Science"} description={"Course2"} credits={3}></Course>
            </Row>
            <Row>
                <Course id={"PHYS207"} name={"Fundamentals of Physics"} description={"Probably the best course at UD"} credits={3}></Course>
            </Row>
            <Row>
                <Course id={"MATH241"} name={"Calculus 1"} description={"What's a derivative?"} credits={3}></Course>
            </Row>
            <p></p>
        </Col> 
    </BootstrapCard>
    );
}

export default Semester;