import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Course from "./components/Course";
import Semester from "./components/Semester";
import { Col } from "react-bootstrap";

function App(): JSX.Element {
    return (
        <div className="App">
            <Semester></Semester>
        </div>
    );
}

export default App;
