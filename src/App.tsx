import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { sem } from "./interfaces/sem";
import WelcomeMsg from "./components/WelcomeMsg";
import { Class } from "./interfaces/course";
import { AllDegreeReqs } from "./components/AllDegreeReqs";

export const LOCAL_STORAGE_SCHEDULE = "cisc-degree-schedule";
export const LOCAL_STORAGE_LISTOFCOURSELISTS = "cisc-degree-listofcourseLists"; 
export const INITIAL_LISTOFCOURSELISTS: Class[][] = [[]];

export const INITIAL_SEMESTER: sem[] =  [
    {
        cnt: 1,        
        year: "Freshman",
        season: "Fall",
        courses: []
    }
];

export function getLocalStorageList(): Class[][] {
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
    const [allDegreeReqVisible, setAllDegreeReqVisible] = useState<boolean>(false);
    
    const [listOfCourseLists, setlistOfCourseLists] = useState<Class[][]>(getLocalStorageList());  
    const [listOfTechElectives, setListOfTechElectives] = useState<Class[][]>([[]]);
    const [listOfFocusClasses, setListOfFocusClasses] = useState<Class[][]>([[]]);
   
    const [globalCredits, setGlobalCredits] = useState<number>(0);
    const [techElectiveCredits, setTechElectiveCredits] = useState<number>(0);
    const [focusAreaCredits, setFocusAreaCredits] = useState<number>(0);

    const credits = {globalCredits, setGlobalCredits, techElectiveCredits, setTechElectiveCredits, focusAreaCredits, setFocusAreaCredits};
    const lists = {listOfCourseLists, setlistOfCourseLists, listOfTechElectives, setListOfTechElectives, listOfFocusClasses, setListOfFocusClasses};

    useEffect(() => {
        console.log(`listOfCourseLists is : ${JSON.stringify(listOfCourseLists)}`);
    },[listOfCourseLists]);

    useEffect(() => {
        console.log(`listOfTechElectives is : ${JSON.stringify(listOfTechElectives)}`);
    },[listOfTechElectives]);

    useEffect(() => {
        console.log(`listOfFocusClasses is : ${JSON.stringify(listOfFocusClasses)}`);
    },[listOfFocusClasses]);

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
        const newTechList = [...listOfTechElectives];
        const newFocusList = [...listOfFocusClasses];
        newList.push([]);
        newTechList.push([]);
        newFocusList.push([]);
        setlistOfCourseLists(newList);
        setListOfTechElectives(newTechList);
        setListOfFocusClasses(newFocusList);
    }

    function clearSemesters() {
        //Clears all semesters except for the first. Resets plan to initial state. 
        setCurrSemesters(INITIAL_SEMESTER);
        setlistOfCourseLists(INITIAL_LISTOFCOURSELISTS);
        setClassYear("Freshman");
        setSeason("Fall");
        setSemesterCnt(1);
    }

    console.log(currSemesters);

    function popLists() {
        const poppedList = [...listOfCourseLists];
        const poppedTechList = [...listOfTechElectives];
        const poppedFocusList = [...listOfFocusClasses];
        poppedList.pop();
        poppedTechList.pop();
        poppedFocusList.pop();
        setlistOfCourseLists(poppedList);
        setListOfTechElectives(poppedTechList);
        setListOfFocusClasses(poppedFocusList);
    }

    function subtractCredits() {
        for(let i = 0; i < listOfCourseLists[semesterCnt-1].length; i++){
            setGlobalCredits(globalCredits-listOfCourseLists[semesterCnt-1][i].credits);
            for(let j = 0; j < listOfTechElectives[semesterCnt-1].length; j++){
                if(listOfTechElectives[semesterCnt-1][j].id === listOfCourseLists[semesterCnt-1][i].id){
                    setTechElectiveCredits(techElectiveCredits-listOfTechElectives[semesterCnt-1][j].credits);
                }
            }
            for(let k = 0; k < listOfFocusClasses[semesterCnt-1].length; k++){
                if(listOfFocusClasses[semesterCnt-1][k].id === listOfCourseLists[semesterCnt-1][i].id){
                    setFocusAreaCredits(focusAreaCredits-listOfFocusClasses[semesterCnt-1][k].credits);
                }
            }
        }
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
        subtractCredits();
        popLists();
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
        alert("Coming soon!");
        //setUploadVisible(true);
        return 0;
    }

    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Button data-testid="degree-button" onClick={()=>{
                showDegreeReq(); //console.log(listOfCourseLists);
            }}>Show Degree Requirements</Button>
            <AllDegreeReqs visible={allDegreeReqVisible} setVisible={setAllDegreeReqVisible} listOfCourseLists={listOfCourseLists} credits={credits}></AllDegreeReqs>
            <Button className="semesterControls" data-testid="add-sem-button" onClick={addSemester}>Add Semester</Button>
            <Button className="semesterControls" onClick={clearSemesters}>Clear Semesters</Button>
            <Button className="semesterControls" data-testid="remove-sem-button" onClick={rmSemester}>Remove Semester</Button>
            <Button className="downloadData" data-testid="save-local-storage" onClick={saveData}>Save Schedule</Button>
            <Button className="saveData" onClick={exportDataFromCSV}>download</Button>
            <Button className="saveData" onClick={importDataFromCSV}>Upload Schedule</Button>
            <Row>
                <Col id="FallSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Fall"){
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semester={s} lists={lists} semesterCnt={s.cnt} credits={credits}></Semester>
                            );
                        }
                    })}
                </Col>
                <Col id="SpringSemesters">
                    {currSemesters.map(s=>{
                        if (s.season === "Spring") {
                            const semID = "semester" + s.cnt;
                            return(
                                <Semester key={semID} semester={s} lists={lists} semesterCnt={s.cnt} credits={credits}></Semester>
                            );
                        }
                    })}
                </Col>
            </Row>

        </div>
    );
}
//<UploadSemesterModal visible={uploadVisible} setVisible={setUploadVisible} setPlan={setCurrSemesters} plan={currSemesters}></UploadSemesterModal>
//classYear={s.year} season={s.season}
export default App;
