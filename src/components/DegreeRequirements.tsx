import React from "react";
import { Card as BootstrapCard, Col, Row} from "react-bootstrap";


export function DegreeRequirements({requirement, fulfilled, degreeReqVisible}: {requirement: string, fulfilled: boolean, degreeReqVisible: boolean}): JSX.Element {
    return <Col>
        {degreeReqVisible && <BootstrapCard className = {fulfilled ? "reqfilled degree col-sm-4" : "requnfilled degree col-sm-4"} >  
            <Row>
                <BootstrapCard.Text>Requirement: {requirement}, {fulfilled ? "Fulfilled" : "Unfulfilled"} </BootstrapCard.Text>
            </Row>
        </BootstrapCard>}
    </Col>;
}