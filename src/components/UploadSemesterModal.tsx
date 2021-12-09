import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { semester } from "../interfaces/semester";
import { importClass } from "../interfaces/importPlan";
import { Class } from "../interfaces/course";
import { courseMap } from "../utilities/extractClasses";
import { creditsHandlers } from "../interfaces/creditsHandlers";



export function UploadSemesterModal({credits, visible, setVisible, setPlan, setSemesterCnt, setSeason, setClassYear}: 
    {credits: creditsHandlers, visible: boolean, setVisible: (b: boolean) => void, setPlan: (s: semester[])=>void, setSemesterCnt: (s: number)=>void, setSeason: (s: string)=>void, setClassYear: (s: string)=>void}): JSX.Element {

    const hide = () => setVisible(false);   //  sets visibility of the uplay semester modal

    function upload(e: React.ChangeEvent<HTMLInputElement>) {   //  opens an uploaded file to convert to the plan data file
        if (e.currentTarget.files !== null){
            const file = e.currentTarget.files[0];
            const readfile = new FileReader();
            readfile.readAsText(file);
            readfile.onload = async(e) => {
                const planCSV = e.target?.result;
                const plsWork = String(planCSV);
                parseData(plsWork);
            };
        } else {
            return;
        }
    }

    function parseData(csv: string) {   //  parases though each field and creates a list of couseIDs to search for the courseMap
        const headerEnd = csv.indexOf("\n");
        let newPlanRaw: string[] = [];
        let newLine: string;
        let planCooking: importClass[] = [];
        let parser = headerEnd;
        let parserTmp = 0;

        while (parser !== -1) {
            parserTmp = csv.indexOf("\n",parser+1);
            newLine = csv.slice(parser,parserTmp);
            newPlanRaw = newPlanRaw.concat([newLine]);
            parser = parserTmp;
        }

        newPlanRaw.forEach(c=>{
            let parserStart = 1;
            let parserEnd = c.indexOf(",",parserStart+1);
            const newSemCnt = c.slice(parserStart,parserEnd);
            const newSemCnt1 = parseInt(newSemCnt,10);

            parserStart = parserEnd;
            parserEnd = c.indexOf(",",parserStart+1);
            const newSemYear = c.slice(parserStart+1,parserEnd);

            parserStart = parserEnd;
            parserEnd = c.indexOf(",",parserStart+1);
            const newSemSeason = c.slice(parserStart+1,parserEnd);

            parserStart = parserEnd;
            parserEnd = c.indexOf(",",parserStart+1);
            const newClassID = c.slice(parserStart+1,parserEnd);

            if(!isNaN(newSemCnt1)) {
                const newNode:importClass[] = [{cnt:newSemCnt1,year:newSemYear,season:newSemSeason,id:newClassID}];
                planCooking = planCooking.concat(newNode);
            }
        });    
        saveUpload(planCooking);
    }

    function saveUpload(data: importClass[]) {  //  searches a list of courseIDs from the course map and adds them to the plan data file.
        let semesterList: semester[] = [];
        let i = 0;
        for (i;i<data[data.length-1].cnt;i++) {
            const year = buildYear(i);
            const season = buildSeason(i);
            const semesterTemplate: semester = {    // create a template for each semester we will be adding courses to.
                cnt:i+1,
                year: year,
                season: season,
                courses: []
            }; 
            semesterList = semesterList.concat(semesterTemplate);
        }
        let totalCredits = 0;
        data.forEach(d=>{
            semesterList[d.cnt-1].season = d.season;
            semesterList[d.cnt-1].year = d.year;

            // Look up course 
            const x: Class[] = courseMap[d.id.slice(0,4)].filter(c=>c.id.indexOf(d.id)!==-1);
            const creditNumber = x[0].credits;
            const classFound:Class[] = [{id:x[0].id,name:x[0].name,description:x[0].description,credits:creditNumber,prereqs:x[0].prereqs, specreq:""}];
            
            totalCredits += creditNumber;
            removeSpecialReqCredits(classFound[0]);
            const courses = semesterList[d.cnt-1].courses.concat(classFound);
            semesterList[d.cnt-1].courses = courses;
        });

        const semesterListTmp = semesterList.map(s=>s);
        credits.setGlobalCredits(totalCredits);
        setSeason(semesterList[semesterList.length-1].season);
        setSemesterCnt(semesterList[semesterList.length-1].cnt);
        setClassYear(semesterList[semesterList.length-1].year);
        setPlan(semesterListTmp);
        hide();
    }

    function buildSeason(cnt: number):string {  // sets the season while building the semester template
        if (cnt%2 !== 0) {
            return "Spring";
        } else {
            return "Fall";
        }
    }

    function buildYear(cnt: number):string {  // sets the year while building the semester template
        if (cnt === 0 || cnt === 1) {
            return "Freshman";
        } else if (cnt === 2 || cnt === 3) {
            return "Sohpmore";
        } else if (cnt === 4 || cnt === 5) {
            return "Junior";
        } else {
            return "Senior";
        }
    }

    function removeSpecialReqCredits(course: Class){    
        if(course.specreq == "Six additional credits of technical electives"){
            credits.setTechElectiveCredits(credits.techElectiveCredits-course.credits);
        } else if (course.specreq == "12 credits for an approved focus area"){
            credits.setFocusAreaCredits(credits.focusAreaCredits-course.credits);
        }
    }

    return (
        <div>
            <Modal show={visible} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Plan</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <input className="csvUpload" type="file" onChange={upload}/>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>{
                        hide();
                    }}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    
}





