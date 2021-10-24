import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";

function App(): JSX.Element {
    const [classYear,setClassYear] = React.useState<string>("Freshman");
    const [season,setSeason] = React.useState<string>("Fall");
    const [semesterCnt,setSemesterCnt] = React.useState<number>(1);
    const [currSemesters,setCurrSemesters] = React.useState<sem[]>([{cnt: semesterCnt,year: classYear,season: season}]);

    function addSemester() {
        let newSeason = season;
        let newYear = classYear;
        switch (season) {
        case "Fall":
            setSeason("Spring");
            newSeason = "Spring";
            break;
        case "Spring":
            setSeason("Fall");
            newSeason = "Fall";
            switch (classYear) {
            case "Freshman":
                setClassYear("Sophmore");  
                newYear = "Sophmore";
                break;
            case "Sophmore":
                setClassYear("Junior");
                newYear = "Junior";
                break;
            case "Junior":
                setClassYear("Senior");
                newYear = "Senior";
                break; 
            case "Senior":
                break;
            }
        }
        const newSem:sem[] = [{cnt: semesterCnt+1,year: newYear,season: newSeason}];
        setSemesterCnt(semesterCnt+1);
        setCurrSemesters(currSemesters.concat(newSem));   
    }

    function clearSemesters() {
        const firstSem:sem[] = [{cnt: 1,year: "Freshman",season: "Fall"}];
        setClassYear("Freshman");
        setCurrSemesters(firstSem);
        setSeason("Fall");
        setSemesterCnt(1);
    }

    function rmSemester() {
        if (semesterCnt === 1) {
            return;
        }
        const semPop:sem[] = currSemesters;
        semPop.pop();
        setCurrSemesters(semPop);
        setClassYear(semPop[semPop.length-1].year);
        setSeason(semPop[semPop.length-1].season);
        setSemesterCnt(semPop[semPop.length-1].cnt);
    }

    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Button className="semesterControls" onClick={addSemester}>Add Semester</Button>
            <Button className="semesterControls" onClick={clearSemesters}>Clear Semesters</Button>
            <Button className="semesterControls" onClick={rmSemester}>Remove Semester</Button>
            <Row>
                <Col id="FallSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Fall") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key = {semID} classYear={s.year} season={s.season}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key = {semID} classYear={s.year} season={s.season}></Semester>
                            );
                        }
                    })}
                </Col>
            </Row>
        </div>
    );
}

export default App;
