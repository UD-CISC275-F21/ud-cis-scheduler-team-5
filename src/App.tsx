import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import ReactDOM from "react-dom";

function App(): JSX.Element {
    const [classYear,setClassYear] = React.useState<string>("Freshman");
    const [season,setSeason] = React.useState<string>("Fall");
    const [semesterCnt,setSemesterCnt] = React.useState<number>(1);
    const [currSemesters,setCurrSemesters] = React.useState<sem[]>([{cnt: semesterCnt,year: classYear,season: season}]);

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
                alert(newYear);
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

    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Button onClick={addSemester}>Add Semester</Button>
            <Button onClick={clearSemesters}>Clear Semesters</Button>
            {currSemesters.map(s=>{
                const cardID = "semester" + s.cnt;
                return(
                    <Semester key = {cardID} classYear={s.year} season={s.season}></Semester>
                );
            })}
        </div>
    );
}

export default App;
