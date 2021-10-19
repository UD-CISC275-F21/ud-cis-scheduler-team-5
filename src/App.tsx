import React from "react";
import { Col, Row } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import WelcomeMsg from "./components/WelcomeMsg";

function App(): JSX.Element {
    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Row>
                <Col>
                    <Semester classYear = {"Freshman"} season = {"Fall"}></Semester>
                </Col>
                <Col>
                    <Semester classYear = {"Freshman"} season = {"Spring"}></Semester>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Semester classYear = {"Sophomore"} season = {"Fall"}></Semester>
                </Col>
                <Col>
                    <Semester classYear = {"Sophomore"} season = {"Spring"}></Semester>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Semester classYear = {"Junior"} season = {"Fall"}></Semester>
                </Col>
                <Col>
                    <Semester classYear = {"Junior"} season = {"Spring"}></Semester>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Semester classYear = {"Senior"} season = {"Fall"}></Semester>
                </Col>
                <Col>
                    <Semester classYear = {"Senior"} season = {"Spring"}></Semester>
                </Col>
            </Row>
        </div>
    );
}

export default App;
