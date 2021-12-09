import React from "react";
import { DegreeRequirements } from "../components/DegreeRequirements";
import { SpecialDegreeReqs } from "../components/SpecialDegreeReqs";
import DEGREEREQS from "../assets/degreereqs.json";
import { DegreeReq } from "../interfaces/degreereq";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { Button, Modal, Table} from "react-bootstrap";
import { Class } from "../interfaces/course";


export function AllDegreeReqs({visible, setVisible, listOfCourseLists, credits}: 
    {visible: boolean, setVisible: (v: boolean)=>void , listOfCourseLists: Class[][], credits: creditsHandlers}): JSX.Element {

    function checkDegreeReq(aReq: DegreeReq) {
        let i = 0;
        let j = 0;
        for(i = 0; i < listOfCourseLists.length; i++){
            for(j = 0; j < listOfCourseLists[i].length; j++){
                if(aReq.id.includes(listOfCourseLists[i][j].id)){
                    return true;
                }
            }
        }
        return false;
    }

    function checkSpecialReq(aReq: DegreeReq){
        if(aReq.id === "Six additional credits of technical electives" && credits.techElectiveCredits === 6){
            return true;
        } else if(aReq.id === "12 credits for an approved focus area" && credits.focusAreaCredits === 12){
            return true;
        } else {
            return false;
        }
    }

    function displayWhichReq(aReq: DegreeReq){
        if(aReq.id === "Six additional credits of technical electives"){
            return true;
        } else {
            return false;
        }
    }

    function hide(){
        setVisible(!visible);
    }

    return <Modal show={visible}>
        <Modal.Header>
            <Modal.Title>Degree Requirements</Modal.Title>
            <Button onClick={hide}>Close</Button>
        </Modal.Header>

        <strong className="degree-subtitle" data-testid="global-credit-counter">Credit Count: {credits.globalCredits} out of 124 needed</strong>
        <Table data-testid="degreeReqs">
            <th className="degree-subtitle">Core Requirements</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("CISC") || reqs.id.includes("MATH") || reqs.id.includes("ENGL")).map((aReq: DegreeReq) => {
                    return (
                        <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements> 
                    );
                })}
            </tbody>
        </Table>
        <Table> 
            <th className="degree-subtitle">Special Requirements</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("credits")).map((aReq: DegreeReq) => {
                    return (
                        <SpecialDegreeReqs key={aReq.id} requirement={aReq.id} fulfilled={checkSpecialReq(aReq)} displayWhich={displayWhichReq(aReq)} credits={credits}></SpecialDegreeReqs> 
                    );
                })}
            </tbody>
        </Table>
        <strong className="degree-subtitle">Science Requirements</strong>
        <Table> 
            <th className="degree-subtitle">Option 1</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("PHYS")).map((aReq: DegreeReq) => {
                    return (
                        <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements>  
                    );
                })}
            </tbody>
        </Table>
        <Table> 
            <th className="degree-subtitle">Option 2</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("CHEM")).map((aReq: DegreeReq) => {
                    return (
                        <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements>  
                    );
                })}
            </tbody>
        </Table>
        <Table> 
            <th className="degree-subtitle">Option 3</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("BISC")).map((aReq: DegreeReq) => {
                    return (
                        <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements>  
                    );
                })}
            </tbody>
        </Table>
        <Table> 
            <th className="degree-subtitle">Option 4</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("GEOL105") || reqs.id.includes("GEOL107") || reqs.id.includes("GEOL115")).map((aReq: DegreeReq) => {
                    return (
                        <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements>  
                    );
                })}
            </tbody>
        </Table>
        <Table> 
            <th className="degree-subtitle">Option 5</th>
            <tbody>
                {DEGREEREQS.filter(reqs => reqs.id.includes("GEOL107") || reqs.id.includes("GEOL110")).map((aReq: DegreeReq) => {
                    return (
                        <DegreeRequirements key={aReq.id} requirement={aReq.id} fulfilled={checkDegreeReq(aReq)}></DegreeRequirements>  
                    );
                })}
            </tbody>
        </Table>
    </Modal>;
}