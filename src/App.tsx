import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import { DegreeRequirements } from "./components/DegreeRequirements";
import CLASSES from "./assets/classes.json";
import { Class } from "./interfaces/course";
import { idText } from "typescript";


export const LOCAL_STORAGE_SCHEDULE = "cisc-degree-schedule";

export const INITIAL_PLAN: sem[] =  [
    {
        cnt: 1,        
        year: "Freshman",
        season: "Fall"
    }
];

export function getLocalStoragePlan(): sem[] {
    const rawSchedule: string | null = localStorage.getItem(LOCAL_STORAGE_SCHEDULE);
    console.log(LOCAL_STORAGE_SCHEDULE);
    if (rawSchedule === null) {
        return [...INITIAL_PLAN];
    } else {
        return JSON.parse(rawSchedule);
    }
}

function App(): JSX.Element {
    const initialClasses:Class[] =[ {id:"CISC275", name:"Intro to Software Engineering", description:"Course1", credits:3, prereqs:"None"},
        {id:"CISC106", name:"Intro to Computer Engineering", description:"Course2", credits:3, prereqs:"None"},
        {id:"PHYS207", name:"Fundamentals of Physics 1", description:"Probably the best course at UD", credits:4, prereqs:"None"},
        {id:"MATH241", name:"Calculus 1", description:"What's a derivative?", credits:4, prereqs:"None"}
    ];

    const [classYear,setClassYear] = React.useState<string>("Freshman");
    const [season,setSeason] = React.useState<string>("Fall");
    const [semesterCnt,setSemesterCnt] = React.useState<number>(1);
    const [currSemesters,setCurrSemesters] = React.useState<sem[]>([{cnt: semesterCnt,year: classYear,season: season}]);
    const [courseList, setCourseList] = useState<string[]>(["CISC275", "CISC106", "PHYS207", "MATH241"]);
    const [degreeReqVisible, setDegreeReqVisible] = useState<boolean>(false);

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
        console.log(newSem);
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

    function saveData() {
        localStorage.setItem(LOCAL_STORAGE_SCHEDULE, JSON.stringify(currSemesters));
        console.log(localStorage);
    }

    function displayCurrClasses(currClass: Class[]){
        let i = 0;
        for(i = 0; i < currClass.length; i++){
            console.log(currClass[i].id);
            addCourseList(currClass[i].id);
        }
    }

    function addCourseList(c: string){
        console.log(c);
        setCourseList([...courseList, c]);
        console.log(courseList);
    }

    function checkDegreeReq(aClass: Class) {
        let i = 0;
        for(i = 0; i < courseList.length; i++){
            if(courseList[i] === aClass.id){
                return true;
            }
        }
        return false;
    }

    function showDegreeReq(){
        setDegreeReqVisible(!degreeReqVisible);
    }

    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Button onClick={()=>{
                showDegreeReq(); console.log(courseList);
            }}>Show Degree Requirements</Button>
            { 
                CLASSES.map(
                    (aClass: Class) => <DegreeRequirements key={aClass.id} requirement={aClass.id} fulfilled={checkDegreeReq(aClass)} degreeReqVisible={degreeReqVisible}></DegreeRequirements> 
                )
            }
            <Button className="semesterControls" onClick={addSemester}>Add Semester</Button>
            <Button className="semesterControls" onClick={clearSemesters}>Clear Semesters</Button>
            <Button className="semesterControls" onClick={rmSemester}>Remove Semester</Button>
            <Button className="downloadData" onClick={saveData}>Save Schedule</Button>
            <Row>
                <Col id="FallSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Fall"){
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key = {semID} courseList = {courseList} setCourseList={setCourseList}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key = {semID} courseList = {courseList} setCourseList={setCourseList}></Semester>
                            );
                        }
                    })}
                </Col>
            </Row>
        </div>
    );
}

//classYear={s.year} season={s.season}
export default App;
