import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import { AllDegreeReqs } from "./components/AllDegreeReqs";


export const LOCAL_STORAGE_SCHEDULE = "cisc-degree-schedule";
export const LOCAL_STORAGE_LISTOFCOURSELISTS = "cisc-degree-listofcourseLists"; 
export const INITIAL_LISTOFCOURSELISTS: string[][] = [[], [], [], [], [], [], [], []];
export const INITIAL_SEMESTER: sem[] =  [
    {
        cnt: 1,        
        year: "Freshman",
        season: "Fall",
        courses: []
    }
];

export function getLocalStorageList(): string[][] {
    const rawList: string | null = localStorage.getItem(LOCAL_STORAGE_LISTOFCOURSELISTS);
    if (rawList === null) {
        return [...INITIAL_LISTOFCOURSELISTS];
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
    const [listOfCourseLists, setlistOfCourseLists] = useState<string[][]>(getLocalStorageList());    
    const [allDegreeReqVisible, setAllDegreeReqVisible] = useState<boolean>(false);
    

    useEffect(() => {
        console.log(`listOfCourseLists is : ${listOfCourseLists}`);
    },[listOfCourseLists]);

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
        setlistOfCourseLists(INITIAL_LISTOFCOURSELISTS);
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
        localStorage.setItem(LOCAL_STORAGE_LISTOFCOURSELISTS, JSON.stringify(listOfCourseLists));
    }

    /*function checkDegreeReq(aReq: DegreeReq) {
        let i = 0;
        for(i = 0; i < listOfCourseLists.length; i++){
            if(aReq.id.includes(listOfCourseLists[i])){
                return true;
            }
        }
        return false;
    }*/

    function showDegreeReq(){
        setAllDegreeReqVisible(!allDegreeReqVisible);
    }

    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Button data-testid="degree-button" onClick={()=>{
                showDegreeReq(); //console.log(listOfCourseLists);
            }}>Show Degree Requirements</Button>
            <AllDegreeReqs visible={allDegreeReqVisible} listOfCourseLists={listOfCourseLists}></AllDegreeReqs>
            <Button className="semesterControls" data-testid="add-sem-button" onClick={addSemester}>Add Semester</Button>
            <Button className="semesterControls" onClick={clearSemesters}>Clear Semesters</Button>
            <Button className="semesterControls" data-testid="remove-sem-button" onClick={rmSemester}>Remove Semester</Button>
            <Button className="downloadData" onClick={saveData}>Save Schedule</Button>
            <Row>
                <Col id="FallSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Fall"){
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semester={s} listOfCourseLists={listOfCourseLists} setlistOfCourseLists={setlistOfCourseLists} semesterCnt={semesterCnt}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semester={s} listOfCourseLists={listOfCourseLists} setlistOfCourseLists={setlistOfCourseLists} semesterCnt={semesterCnt}></Semester>
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
