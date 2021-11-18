import React from "react";
import { DegreeRequirements } from "../components/DegreeRequirements";
import DEGREEREQS from "../assets/degreereqs.json";
import { DegreeReq } from "../interfaces/degreereq";
import { Card as BootstrapCard, Col} from "react-bootstrap";


export function AllDegreeReqs({visible, listOfCourseLists}: 
    {visible: boolean, listOfCourseLists: string[][]}): JSX.Element {

    function checkDegreeReq(aReq: DegreeReq) {
        let i = 0;
        let j = 0;
        for(i = 0; i < listOfCourseLists.length; i++){
            for(j = 0; j < listOfCourseLists[i].length; j++){
                if(aReq.id.includes(listOfCourseLists[i][j])){
                    return true;
                }
            }
        }
        return false;
    }

    return <Col>
        {visible && <BootstrapCard data-testid="degreeReqs">
            Core Requirements
            {DEGREEREQS.map((aReq: DegreeReq) => {
                return (
                    <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements> 
                );
            })}
        </BootstrapCard>}
    </Col>;
}