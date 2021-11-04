import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import { DegreeRequirements } from "./components/DegreeRequirements";
import CLASSES from "./assets/classes.json";
import { Class } from "./interfaces/course";


export const LOCAL_STORAGE_SCHEDULE = "cisc-degree-schedule";
export const LOCAL_STORAGE_COURSELIST = "cisc-degree-courseList"; 
const defaultClasses:Class[] =[];
export const INITIAL_COURSELIST: string[] = [];
export const INITIAL_SEMESTER: sem[] =  [
    {
        cnt: 1,        
        year: "Freshman",
        season: "Fall",
        courses: defaultClasses
    }
];

export function getLocalStorageList(): string[] {
    const rawList: string | null = localStorage.getItem(LOCAL_STORAGE_COURSELIST);
    if (rawList === null) {
        return [...INITIAL_COURSELIST];
    } else {
        return JSON.parse(rawList);
    }
}

export function getLocalStoragePlan(): sem[] {
    const rawSchedule: string | null = localStorage.getItem(LOCAL_STORAGE_SCHEDULE);
    if (rawSchedule === null) {
        return [...INITIAL_SEMESTER];
    } else {
        return JSON.parse(rawSchedule);
    }
}

function App(): JSX.Element {
    const [currSemesters,setCurrSemesters] = React.useState<sem[]>(getLocalStoragePlan());
    const [classYear,setClassYear] = React.useState<string>(currSemesters[currSemesters.length-1].year);
    const [season,setSeason] = React.useState<string>(currSemesters[currSemesters.length-1].season);
    const [semesterCnt,setSemesterCnt] = React.useState<number>(currSemesters[currSemesters.length-1].cnt);
    const [semesterClasses, setSemesterClasses] = React.useState<Class[]>([]);
    const [courseList, setCourseList] = useState<string[]>(getLocalStorageList());
    const [degreeReqVisible, setDegreeReqVisible] = useState<boolean>(false);

    useEffect(() => {
        console.log(`courseList is : ${courseList}`);
    },[courseList]);

    useEffect(() => {
        console.log(`courseList is : ${semesterClasses}`);
    },[semesterClasses]);

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
        const newSem:sem[] = [{cnt: semesterCnt+1,year: newYear,season: newSeason,courses: []}];
        setSemesterCnt(semesterCnt+1);
        setCurrSemesters(currSemesters.concat(newSem));   
    }


    function clearSemesters() {
        setCurrSemesters(INITIAL_SEMESTER);
        setCourseList(INITIAL_COURSELIST);
        setClassYear("Freshman");
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
        console.log(currSemesters);
        localStorage.setItem(LOCAL_STORAGE_SCHEDULE, JSON.stringify(currSemesters));
        localStorage.setItem(LOCAL_STORAGE_COURSELIST, JSON.stringify(courseList));
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


    console.log(semesterClasses);

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
                                <Semester key={semID} semesterCourses={s.courses} setSemesterCourses={setSemesterClasses} courseList={courseList} setCourseList={setCourseList}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semesterCourses={s.courses} setSemesterCourses={setSemesterClasses} courseList={courseList} setCourseList={setCourseList}></Semester>
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
