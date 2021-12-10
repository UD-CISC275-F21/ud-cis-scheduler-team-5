import React from "react";
import { Card as BootstrapCard, Col, Row} from "react-bootstrap";


export function DegreeRequirements({requirement, fulfilled}: {requirement: string, fulfilled: boolean}): JSX.Element {
    return <Col>
        <BootstrapCard className = {fulfilled ? "reqfilled degree col-sm-10" : "requnfilled degree col-sm-10"} >  
            <Row>
                <BootstrapCard.Text>Requirement: {requirement}, {fulfilled ? "Fulfilled" : "Unfulfilled"} </BootstrapCard.Text>
            </Row>
        </BootstrapCard>
    </Col>;
}