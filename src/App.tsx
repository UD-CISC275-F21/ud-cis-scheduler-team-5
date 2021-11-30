import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import { Class } from "./interfaces/course";
import { AllDegreeReqs } from "./components/AllDegreeReqs";
import { UploadSemesterModal } from "./components/UploadSemesterModal";

export const LOCAL_STORAGE_SCHEDULE = "cisc-degree-schedule";
export const LOCAL_STORAGE_LISTOFCOURSELISTS = "cisc-degree-listofcourseLists"; 
export const INITIAL_LISTOFCOURSELISTS: string[][] = [[]];

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

export function getLocalStoragePlan(clear: boolean): sem[] {
    if (clear === true) return [...INITIAL_SEMESTER];
    const rawSchedule: string | null = localStorage.getItem(LOCAL_STORAGE_SCHEDULE);
    if (rawSchedule === null) {
        return [...INITIAL_SEMESTER];
    } else {
        return JSON.parse(rawSchedule);
    }
}

function App(): JSX.Element {
    const [currSemesters,setCurrSemesters] = React.useState<sem[]>(getLocalStoragePlan(false));
    const [classYear,setClassYear] = React.useState<string>(currSemesters[currSemesters.length-1].year);
    const [season,setSeason] = React.useState<string>(currSemesters[currSemesters.length-1].season);
    const [semesterCnt,setSemesterCnt] = React.useState<number>(currSemesters[currSemesters.length-1].cnt);
    const [listOfCourseLists, setlistOfCourseLists] = useState<string[][]>(getLocalStorageList());    
    const [allDegreeReqVisible, setAllDegreeReqVisible] = useState<boolean>(false);
    const [uploadVisible, setUploadVisible] = useState<boolean>(false);
    

    useEffect(() => {
        console.log(`listOfCourseLists is : ${listOfCourseLists}`);
    },[listOfCourseLists]);

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
        const newList = [...listOfCourseLists];
        newList.push([]);
        setlistOfCourseLists(newList);
    }

    function clearSemesters() {
        //Clears all semesters except for the first. Resets plan to initial state. 

        const semesterReset: sem[] =  [
            {
                cnt: 1,        
                year: "Freshman",
                season: "Fall",
                courses: []
            }
        ];


        console.log(semesterReset);

        setCurrSemesters(semesterReset);

        console.log(getLocalStoragePlan(true));

        setlistOfCourseLists(INITIAL_LISTOFCOURSELISTS);
        setClassYear("Freshman");
        setSeason("Fall");
        setSemesterCnt(1);
    }

    console.log(currSemesters);

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
        localStorage.setItem(LOCAL_STORAGE_LISTOFCOURSELISTS, JSON.stringify(listOfCourseLists));
    }

    function showDegreeReq(){
        setAllDegreeReqVisible(!allDegreeReqVisible);
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
        const csvCols = ["Semester Num", "Semester Year", "Semester Season", "CourseID", "Course Name", "Course Description", "Credits"];
        const content = currSemesters.map(s => [
            [s.courses.map(c=>[s.cnt,s.year,s.season,c.id,c.name,prepCSV(c),c.credits,]).join(" \n ")]
        ].join("\n")).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + csvCols + "\n" + content;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_plan.csv");
        document.body.appendChild(link); 
        link.click();
    }

    function importDataFromCSV() {
        setUploadVisible(true);
        return 0;
    }

    function buildCurrSemesters(data: sem[]) {
        console.log(data);
        let i = 0;
        let newList: string[][] = [[]];



        for (i=0;i<data.length-1;i++) {
            newList = newList.concat([[]]);
        }
        for (i=0;i<data.length;i++){
            console.log(data[i].cnt);
            newList[i] = data[i].courses.map(c=>c.id);
        }
        
        localStorage.setItem(LOCAL_STORAGE_SCHEDULE, JSON.stringify(data));
        localStorage.setItem(LOCAL_STORAGE_LISTOFCOURSELISTS, JSON.stringify(newList));
        window.location.reload();
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
            <Button className="downloadData" data-testid="save-local-storage" onClick={saveData}>Save Schedule</Button>
            <Button className="saveData" onClick={exportDataFromCSV}>Download Plan</Button>
            <Button className="saveData" onClick={importDataFromCSV}>Upload Schedule</Button>
            <UploadSemesterModal visible={uploadVisible} setVisible={setUploadVisible} setPlan={(data)=>buildCurrSemesters(data)} listOfCourseLists={listOfCourseLists} setSemesterCnt={setSemesterCnt} setClassYear={setClassYear} setSeason={setSeason} ></UploadSemesterModal>
            <Row className="semesterRows">
                <Col id="FallSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Fall"){
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semester={s} listOfCourseLists={listOfCourseLists} setlistOfCourseLists={setlistOfCourseLists} semesterCnt={s.cnt}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semester={s} listOfCourseLists={listOfCourseLists} setlistOfCourseLists={setlistOfCourseLists} semesterCnt={s.cnt}></Semester>
                            );
                        }
                    })}
                </Col>
            </Row>

        </div>
    );
}
//
//classYear={s.year} season={s.season}
export default App;
