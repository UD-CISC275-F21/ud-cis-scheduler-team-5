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
export const INITIAL_COURSELIST: string[] = [];

/*
export const USER_DATA: string[] = [
    courses: INITIAL_COURSELIST,
    science: [],
    core: [],
    concentration: [],
    communicaiton: [],
    engineeringBreadth: [],
    universityBreadth: [],
    dle: [],

]
*/

export const INITIAL_SEMESTER: sem[] =  [   
    {
        cnt: 1,        
        year: "Freshman",
        season: "Fall",
        courses: []
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
    const [courseList, setCourseList] = useState<string[]>(getLocalStorageList());
    const [degreeReqVisible, setDegreeReqVisible] = useState<boolean>(false);

    useEffect(() => {
        console.log(`courseList is : ${courseList}`);
    },[courseList]);

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

    function exportDataToCSV() {
        const content = currSemesters.map(s => [
            [s.cnt, s.season, s.year], 
            [s.courses.map(c=>
                [c.id,c.credits,c.name,c.description,c.prereqs]
            )]
        
        ]);
          
        console.log(content);

        //s.cnt + "," + s.season + "," + s.year + "," + s.courses.map(c => c.description + "," + c.credits + "," + c.id + "," + c.name).join(",")
            
        //}).join(",");
        
        
        //let i = 0;
        //for (i;i<content.length;i++) {
        //content = content.replace(" ","_");
        //console.log(content[i]);
        //}
        //const csvFile = new Blob([content], {type: "text/csv"});
        //console.log(csvFile);
        //console.log(content);
        //const csvContent = "data:text/csv;charset=utf-8," + content;
        //console.log(csvContent);
    }

    function importDataFromCSV() {
        return 0;
    }


    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Button onClick={()=>{
                showDegreeReq(); //console.log(courseList);
            }}>Show Degree Requirements</Button>
            { 
                CLASSES.map(
                    (aClass: Class) => <DegreeRequirements key={aClass.id} requirement={aClass.id} fulfilled={checkDegreeReq(aClass)} degreeReqVisible={degreeReqVisible}></DegreeRequirements> 
                )
            }
            <Button className="semesterControls" onClick={addSemester}>Add Semester</Button>
            <Button className="semesterControls" onClick={clearSemesters}>Clear Semesters</Button>
            <Button className="semesterControls" onClick={rmSemester}>Remove Semester</Button>
            <Button className="saveData" onClick={saveData}>Save Schedule</Button>
            <Button className="saveData" onClick={exportDataToCSV}>Download Schedule</Button>
            <Button className="saveData" onClick={importDataFromCSV}>Upload Schedule</Button>

            <Row>
                <Col id="FallSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Fall"){
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} currSemesters={currSemesters} semester={s} courseList={courseList} setCourseList={setCourseList}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} currSemesters={currSemesters} semester={s} courseList={courseList} setCourseList={setCourseList}></Semester>
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
