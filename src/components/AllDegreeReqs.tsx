import React from "react";
import { DegreeRequirements } from "../components/DegreeRequirements";
import DEGREEREQS from "../assets/degreereqs.json";
import { DegreeReq } from "../interfaces/degreereq";
import { Card as BootstrapCard, Col} from "react-bootstrap";


export function AllDegreeReqs({visible, courseList}: 
    {visible: boolean, courseList: string[]}): JSX.Element {

    function checkDegreeReq(aReq: DegreeReq) {
        let i = 0;
        for(i = 0; i < courseList.length; i++){
            if(aReq.id.includes(courseList[i])){
                return true;
            }
        }
        return false;
    }

    return <Col>
        {visible && <BootstrapCard>
            Core Requirements
            {DEGREEREQS.map((aReq: DegreeReq) => {
                return (
                    <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements> 
                );
            })}
        </BootstrapCard>}
    </Col>;
}