import React, { useEffect, useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import "./App.css";
import Semester from "./components/Semester";
import { semester } from "./interfaces/semester";
import WelcomeMsg from "./components/WelcomeMsg";
import { Class } from "./interfaces/course";
import { AllDegreeReqs } from "./components/AllDegreeReqs";
import { UploadSemesterModal } from "./components/UploadSemesterModal";

export const LOCAL_STORAGE_SCHEDULE = "cisc-degree-schedule";
export const LOCAL_STORAGE_LISTOFCOURSELISTS = "cisc-degree-listofcourseLists"; 
export const INITIAL_LISTOFCOURSELISTS: Class[][] = [[]];

export const INITIAL_SEMESTER: semester[] =  [
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

export function getLocalStoragePlan(clear: boolean): semester[] {
    if (clear === true) return [...INITIAL_SEMESTER];
    const rawSchedule: string | null = localStorage.getItem(LOCAL_STORAGE_SCHEDULE);
    if (rawSchedule === null) {
        return [...INITIAL_SEMESTER];
    } else {
        return JSON.parse(rawSchedule);
    }
}

function App(): JSX.Element {
    const [currSemesters,setCurrSemesters] = React.useState<semester[]>(getLocalStoragePlan(false));
    const [classYear,setClassYear] = React.useState<string>(currSemesters[currSemesters.length-1].year);
    const [season,setSeason] = React.useState<string>(currSemesters[currSemesters.length-1].season);
    const [semesterCnt,setSemesterCnt] = React.useState<number>(currSemesters[currSemesters.length-1].cnt);
    const [allDegreeReqVisible, setAllDegreeReqVisible] = useState<boolean>(false);
    const [uploadVisible, setUploadVisible] = useState<boolean>(false);
    const [showWelcome, setShowWelcome] = useState<boolean>(true);

    const [listOfCourseLists, setlistOfCourseLists] = useState<Class[][]>(getLocalStorageList());  
    const [globalCredits, setGlobalCredits] = useState<number>(0);
    const [techElectiveCredits, setTechElectiveCredits] = useState<number>(0);
    const [focusAreaCredits, setFocusAreaCredits] = useState<number>(0);

    const credits = {globalCredits, setGlobalCredits, techElectiveCredits, setTechElectiveCredits, focusAreaCredits, setFocusAreaCredits};
    const lists = {listOfCourseLists, setlistOfCourseLists};

    useEffect(() => {   
        console.log(`listOfCourseLists is : ${JSON.stringify(listOfCourseLists)}`);
    },[listOfCourseLists]);

    useEffect(() => {   // updates credits
        let totalCreditsListener = 0;
        currSemesters.forEach(s=>s.courses.forEach(c=>totalCreditsListener+=c.credits));      
        setGlobalCredits(totalCreditsListener);  
    });

    const showGuide = () => {
        setShowWelcome(true);
    };

    function addSemester() {
        // Adds semester to the list of semesters in the user's plan. Semester attributes set depending on the last semester attributes. 
        let newSeason = season;
        let newYear = classYear;
        switch (season) {
        case "Fall":                // places in either the left, fall bucket, or right, spring bucket
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
        const newSememester:semester[] = [{cnt: semesterCnt+1,year: newYear,season: newSeason,courses: []}];
        setSemesterCnt(semesterCnt+1);
        setCurrSemesters(currSemesters.concat(newSememester));
        const newList = [...listOfCourseLists];
        newList.push([]);
        setlistOfCourseLists(newList);
    }

    function resetCredits() {   // resets credits when called in "clearSemesters()"
        setGlobalCredits(0);
        setTechElectiveCredits(0);
        setFocusAreaCredits(0);
        if(currSemesters[0].courses.length > 0){
            for(let i = 0; i < currSemesters[0].courses.length; i++){
                setGlobalCredits(0+currSemesters[0].courses[i].credits);
            }
        }
    }

    function clearSemesters() { // Clears all semesters except for the first. Resets plan to initial state. 

        const semesterReset: semester[] =  [
            {
                cnt: 1,        
                year: "Freshman",
                season: "Fall",
                courses: []
            }
        ];
        setCurrSemesters(semesterReset);
        setCurrSemesters(getLocalStoragePlan(true));
        setlistOfCourseLists([currSemesters[0].courses]);
        resetCredits();
        setClassYear("Freshman");
        setSeason("Fall");
        setSemesterCnt(1);
       
    }

    function popLists() {   // pops off the last list when called in "rmSemester()"
        const poppedList = [...listOfCourseLists];
        poppedList.pop();
        setlistOfCourseLists(poppedList);
    }

    function subtractCredits() {    // subtracts credits from the removed semester, called in "rmSemester()"
        console.log(listOfCourseLists);
        for(let i = 0; i < listOfCourseLists[semesterCnt-1].length; i++){
            setGlobalCredits(globalCredits-listOfCourseLists[semesterCnt-1][i].credits);
            if(listOfCourseLists[semesterCnt-1][i].specreq === "Six additional credits of technical electives"){
                setTechElectiveCredits(techElectiveCredits-listOfCourseLists[semesterCnt-1][i].credits);
            } else if(listOfCourseLists[semesterCnt-1][i].specreq === "12 credits for an approved focus area") {
                setFocusAreaCredits(focusAreaCredits-listOfCourseLists[semesterCnt-1][i].credits);
            }
        }
    }

    function rmSemester() {     // Removes the last semester from the list, called from remove semester button.
        
        if (semesterCnt === 1) {
            return;
        }
        const popSemester:semester[] = currSemesters.map(c=>c);
        popSemester.pop();
        setCurrSemesters(popSemester);
        setClassYear(popSemester[popSemester.length-1].year);
        setSeason(popSemester[popSemester.length-1].season);
        setSemesterCnt(popSemester[popSemester.length-1].cnt);
        subtractCredits();
        popLists();
    }

    function saveData() {   // Saves list of semesters and courselist to local storage, called from save button.
        localStorage.setItem(LOCAL_STORAGE_SCHEDULE, JSON.stringify(currSemesters));
        localStorage.setItem(LOCAL_STORAGE_LISTOFCOURSELISTS, JSON.stringify(listOfCourseLists));
    }

    function showDegreeReq(){   //  Shows degree requirements modal
        setAllDegreeReqVisible(!allDegreeReqVisible);
    }

    function prepCSV(c: Class): string {    // filters out commas in prep for csv export, called in "exportDataFromCSV()"
        let i = 0;
        const len = c.description.length;
        let newDes = "";
        for (i;i<len;i++){
            newDes += c.description[i].replace(",",";"); 
        }
        return newDes;
    }

    function exportDataFromCSV() {  //  converts schedule to CSV and downloads to computer, called from download plan button.
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

    function importDataFromCSV() {  //  shows modal to upload semester plan csv.
        setUploadVisible(true);
    }

    function buildCurrSemesters(data: semester[]) { //  converts csv data to a useable plan
        let newClassList: Class [][] = [];
        let totalCredits = 0;
        data.map((semesters)=>{
            newClassList = newClassList.concat([semesters.courses]);
            semesters.courses.forEach(c=> totalCredits += c.credits );
        });
        
        setlistOfCourseLists(newClassList);
        localStorage.setItem(LOCAL_STORAGE_SCHEDULE, JSON.stringify(data));
        localStorage.setItem(LOCAL_STORAGE_LISTOFCOURSELISTS, JSON.stringify(newClassList));

        const newSemesterList = data.map(s=>s);
        setCurrSemesters(newSemesterList);
        window.location.reload();
    }


    return (
        <div className="App">
            <WelcomeMsg show={showWelcome} setShow={setShowWelcome}></WelcomeMsg>
            <Button id="helpButton" onClick={showGuide}>Help</Button>

            <h2>UD CIS Scheduler</h2>

            <Button className="control-buttons" data-testid="degree-button" onClick={()=>{
                showDegreeReq(); //console.log(listOfCourseLists);
            }}>Show Degree Requirements</Button>
            <AllDegreeReqs visible={allDegreeReqVisible} setVisible={setAllDegreeReqVisible} listOfCourseLists={listOfCourseLists} credits={credits}></AllDegreeReqs>
            <Container>
                <Row>
                    <Col><h6>Semester Controls</h6></Col>
                    <Col><h6>Import/Export Schedule</h6></Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="control-buttons" data-testid="add-sem-button" onClick={addSemester}>Add Semester</Button>
                        <Button className="control-buttons" onClick={clearSemesters}>Clear Semesters</Button>
                        <Button className="control-buttons" data-testid="remove-sem-button" onClick={rmSemester}>Remove Semester</Button>
                    </Col>
                    <Col>
                        <Button className="control-buttons" data-testid="save-local-storage" onClick={saveData}>Save Plan</Button>
                        <Button className="control-buttons" onClick={exportDataFromCSV}>Download Plan</Button>
                        <Button className="control-buttons" onClick={importDataFromCSV}>Upload Plan</Button>
                    </Col>

                </Row>
            </Container>
            
            <UploadSemesterModal credits={credits} visible={uploadVisible} setVisible={setUploadVisible} setPlan={(data) => buildCurrSemesters(data)} setSemesterCnt={setSemesterCnt} setClassYear={setClassYear} setSeason={setSeason}></UploadSemesterModal>
            <Row className="semesterRows">
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
//
//classYear={s.year} season={s.season}
export default App;
