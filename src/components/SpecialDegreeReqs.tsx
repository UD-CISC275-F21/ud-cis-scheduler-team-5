import React from "react";
import { Card as BootstrapCard, Col, Row} from "react-bootstrap";
import { creditsHandlers } from "../interfaces/creditsHandlers";

export function SpecialDegreeReqs({requirement, fulfilled, displayWhich, credits}: 
    {requirement: string, fulfilled: boolean, displayWhich: boolean, credits: creditsHandlers}): JSX.Element {
    return <Col>
        <BootstrapCard className = {fulfilled ? "reqfilled degree col-sm-10" : "requnfilled degree col-sm-10"} >  
            <Row>
                <BootstrapCard.Text>Requirement: {requirement}</BootstrapCard.Text>
                <BootstrapCard.Text> {displayWhich ? credits.techElectiveCredits + " out of 6" : credits.focusAreaCredits + " out of 12"} </BootstrapCard.Text>
            </Row>
        </BootstrapCard>
    </Col>;
}