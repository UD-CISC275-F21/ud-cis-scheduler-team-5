import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import { DegreeRequirements } from "./components/DegreeRequirements";
import CLASSES from "./assets/classes.json";
import { Class } from "./interfaces/course";
import { CSVLink } from "react-csv";
import { UploadSemesterModal } from "./components/UploadSemesterModal";


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
    const [uploadVisible, setUploadVisible] = useState<boolean>(false);

    useEffect(() => {
        //console.log(`courseList is : ${courseList}`);
    },[courseList]);

    function addSemester() {
        //Adds semester to the list of semesters in the user's plan. Semester attributes set depending on the last semester attributes. 
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
        //Clears all semesters except for the first. Resets plan to initial state. 
        setCurrSemesters(INITIAL_SEMESTER);
        setCourseList(INITIAL_COURSELIST);
        setClassYear("Freshman");
        setSeason("Fall");
        setSemesterCnt(1);
    }

    function rmSemester() {
        //Removes the last semester from the list.
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
        //Saves list of semesters and courselist to local storage.
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

    function prepCSV(c: Class): string {
        let i = 0;
        const len = c.description.length;
        let newDes = "";
        for (i;i<len;i++){
            newDes += c.description[i].replace(",",";"); 
        }
        return newDes;
    }

    function exportDataFromCSV() {
        const credits = "Credits";
        const csvCols = ["Semester Num", "Semester Year", "Semester Season", "CourseID", "Course Name", "Course Description", "Credits"];
        const content = currSemesters.map(s => [
            [s.courses.map(c=>[s.cnt,s.year,s.season,c.id,c.name,prepCSV(c),c.credits,]).join(" \n ")]
        ].join("\n")).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + csvCols + "\n" + content;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); 
        link.click();
    }

    function importDataFromCSV() {
        setUploadVisible(true);
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
            <CSVLink id="csv" data={JSON.stringify(currSemesters,null,2).replaceAll(",","*")}>
                <Button className="saveData">Export Data</Button>
            </CSVLink>
            <Button className="saveData" onClick={exportDataFromCSV}>download</Button>
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
            <UploadSemesterModal visible={uploadVisible} setVisible={setUploadVisible} setPlan={setCurrSemesters} plan={currSemesters}></UploadSemesterModal>
        </div>
    );
}

//classYear={s.year} season={s.season}
export default App;
