import React from "react";
import { Card as BootstrapCard, Col, Row} from "react-bootstrap";
import CLASSES from "../assets/classes.json";
import { Class } from "../interfaces/course";

export function DegreeRequirements({requirement, fulfilled, degreeReqVisible}: {requirement: string, fulfilled: boolean, degreeReqVisible: boolean}): JSX.Element {
    return <Col>
        {degreeReqVisible && <BootstrapCard className = "degree col-sm-4">  
            <Row>
                <BootstrapCard.Text>Requirement: {requirement}, {fulfilled ? "Fulfilled" : "Unfulfilled"} </BootstrapCard.Text>
            </Row>
        </BootstrapCard>}
    </Col>;
}