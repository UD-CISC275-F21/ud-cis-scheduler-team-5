import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";

function App(): JSX.Element {
    const [classYear,setClassYear] = React.useState<string>("Freshman");
    const [season,setSeason] = React.useState<string>("Fall");
    const [currSemesters,setCurrSemesters] = React.useState<sem[]>([{year: classYear,season: season}]);

    //TODO onclick add semester

    


    function addSemester() {
        let newSeason = season;
        let newYear = classYear;
        switch (season) {
        case ("Fall"):
            setSeason("Spring");
            newSeason = "Spring";
            break;
        case ("Spring"):
            setSeason("Fall");
            newSeason = "Fall";
            switch (classYear) {
            case ("Freshman"):
                setClassYear("Sophmore");  
                newYear = "Sophmore";
                break;
            case ("Sophmore"):
                setClassYear("Junior");
                newYear = "Junior";
                break;
            case ("Junior"):
                setClassYear("Senior");
                newYear = "senior";
                break; 
            case ("Senior"):
                break;
            }
        }

        const newSem:sem[] = [{
            year: newYear,
            season: newSeason
        }];

        setCurrSemesters(currSemesters.concat(newSem));

        console.log(currSemesters);

    }




    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Row>
                <Col>
                    <Semester classYear={classYear} season={season}></Semester>
                </Col>
                <Col>
                    <Button onClick={addSemester}>Add Semester</Button>
                </Col>
            
            
                {/* {    <Col>
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
            } */ }
            </Row>
        </div>
    );
}

export default App;
