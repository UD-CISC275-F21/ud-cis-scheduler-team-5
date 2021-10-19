import React from "react";
import { Col, Row } from "react-bootstrap";
//import { Course } from "../interfaces/Course";

function Course({id, name, description, credits} : {id:string, name:string, description:string, credits:number}): JSX.Element {

    return (
        <td>
            <Row>
                <Col>{id}</Col>
                <Col>{name}</Col>
                <Col>{description}</Col>
                <Col>{credits}</Col>
                <Col><button>Edit</button></Col>
            </Row>
            
        </td>
    );
}

export default Course;