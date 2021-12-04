import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {sem} from "../interfaces/sem";
import { importClass } from "../interfaces/importPlan";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { listHandlers } from "../interfaces/listHandlers";
import courseData from "../assets/courseData.json";
import { Class } from "../interfaces/course";


//export function UploadSemesterModal({visible, setVisible}: {visible: boolean, setVisible: (b: boolean) => void, plan: sem[], setPlan: (s: sem[])=>void}): JSX.Element {
export function UploadSemesterModal({visible, setVisible, setPlan, setlistOfCourseLists, lists, semesterCnt, setSemesterCnt, setSeason, setClassYear}: 
    {visible: boolean, setVisible: (b: boolean) => void, setPlan: (s: sem[])=>void, setlistOfCourseLists: (c: Class[][])=>void, lists: listHandlers, semesterCnt: number, credits: creditsHandlers, setSemesterCnt: (s: number)=>void, setSeason: (s: string)=>void, setClassYear: (s: string)=>void}): JSX.Element {


    const hide = () => setVisible(false);

    function upload(e: React.ChangeEvent<HTMLInputElement>) {
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

    function parseData(csv: string) {
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

    function saveUpload(data: importClass[]) {
        let semesterList: sem[] = [];
        let i = 0;
        for (i;i<data[data.length-1].cnt;i++) {
            const year = buildYear(i);
            const season = buildSeason(i);
            const semesterTemplate: sem = {
                cnt:i+1,
                year: year,
                season: season,
                courses: []
            }; // create a template to build a semester
            semesterList = semesterList.concat(semesterTemplate);
        }

        data.forEach(d=>{
            console.log(semesterList);
            console.log(data);
            semesterList[d.cnt-1].season = d.season;
            semesterList[d.cnt-1].year = d.year;

            // Look up course 

            courseData.filter(c=>c.id.indexOf(d.id));

            const x: Class[] = courseData.filter(c=>c.id.indexOf(d.id)!==-1);
            const creditNumber = x[0].credits;
            const classFound:Class[] = [{id:x[0].id,name:x[0].name,description:x[0].description,credits:creditNumber,prereqs:x[0].prereqs}];
            
            //successfully concatenates class from catalog to courseList

            const courses = semesterList[d.cnt-1].courses.concat(classFound); // Concat found course to semester course list
            
            semesterList[d.cnt-1].courses = courses;
        });

        let newSemesterList: Class [][] = [];
        semesterList.map((semesters)=>{
            newSemesterList = newSemesterList.concat([semesters.courses]);
        });
        
        setlistOfCourseLists(newSemesterList);
        setSeason(semesterList[semesterList.length-1].season);
        setSemesterCnt(semesterList[semesterList.length-1].cnt);
        setClassYear(semesterList[semesterList.length-1].year);
        setPlan(semesterList);
        hide();
        return 1;
    }

    function buildSeason(cnt: number):string {
        if (cnt%2 !== 0) {
            return "Spring";
        } else {
            return "Fall";
        }
    }

    function buildYear(cnt: number):string {
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





