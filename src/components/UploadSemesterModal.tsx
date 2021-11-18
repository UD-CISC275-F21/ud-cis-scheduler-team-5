import React, { ReactChild, ReactEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {sem} from "../interfaces/sem";
import { Class } from "../interfaces/course";
import { readFile } from "fs";
import { importClass } from "../interfaces/importPlan";
import classes from "../assets/classes.json";

//import { ReactFileReader } from "react-file-reader";

export function UploadSemesterModal({visible, setVisible, plan, setPlan}: {visible: boolean, setVisible: (b: boolean) => void, plan: sem[], setPlan: (s: sem[])=>void}): JSX.Element {
    //const [file, setFile] = useState<File>();

    const hide = () => setVisible(false);

    function upload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files !== null){
            const file = e.currentTarget.files[0];
            //console.log(file);
            const readfile = new FileReader();
            readfile.readAsText(file);
            readfile.onload = async(e) => {
                //console.log(e.target?.result);
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
            //const newClassID1 = newClassID.replaceAll(" ","");

            const newNode:importClass[] = [{cnt:newSemCnt1,year:newSemYear,season:newSemSeason,id:newClassID}];
            planCooking = planCooking.concat(newNode);
            
        });    
        //console.log(planCooking);
        //saveUpload(planCooking);
    }


    function saveUpload(data: importClass[]) {
        let semesterList: sem[] = [];
        //let courseList: Class[] = [];
        console.log(data[data.length-1].cnt);
        let i = 1;
        for (i;i<data[data.length].cnt;i++) {
            const year = buildYear(i);
            const season = buildSeason(i);
            const semesterTemplate: sem = {
                cnt:1,
                year: year,
                season: season,
                courses: []
            }; // create a template to build a semester
            semesterList = semesterList.concat(semesterTemplate);
        }
        console.log(semesterList);
        /*data.forEach(d=>{

            if(d.cnt === semesterTemplate.cnt){

                if (semesterTemplate.year === "") {
                    semesterTemplate.year = d.year;
                    semesterTemplate.season = d.season;
                }

                // Look up course 
                classes.filter(c=>c.id.indexOf(d.id));
                const x = classes.filter(c=>c.id.indexOf(d.id)!==-1);
                const creditNumber = parseInt(x[0].credits);
                const classFound:Class[] = [{id:x[0].id,name:x[0].name,description:x[0].description,credits:creditNumber,prereqs:x[0].prereqs}];
                
                courseList = courseList.concat(classFound);
                semesterTemplate.courses = semesterTemplate.courses.concat(classFound); // Concat found course to semester course list            
                semesterList = semesterList.concat(semesterTemplate);

            } else {

                semesterTemplate.cnt = d.cnt;
                semesterTemplate.year = d.year;
                semesterTemplate.season = d.season;
                semesterTemplate.courses = [];
                // Look up course  
                classes.filter(c=>c.id.indexOf(d.id));
                const x = classes.filter(c=>c.id.indexOf(d.id)!==-1);
                const creditNumber = parseInt(x[0].credits);
                const classFound:Class = {id:x[0].id,name:x[0].name,description:x[0].description,credits:creditNumber,prereqs:x[0].prereqs};
                
                semesterTemplate.courses = semesterTemplate.courses.concat(classFound); // Concat found course to semester course list
                semesterList = semesterList.concat(semesterTemplate);
            }

        });
        */
        //semesterList = semesterList.concat(semesterTemplate);
        console.log(semesterList);
        console.log(semesterList[0].courses);
        return 1;
    }

    function buildSeason(cnt: number):string {
        if (cnt%2 === 0) {
            return "Spring";
        } else {
            return "Fall";
        }
    }

    function buildYear(cnt: number):string {
        if (cnt === 1 || cnt === 2) {
            return "Freshman";
        } else if (cnt === 3 || cnt === 4) {
            return "Sohpmore";
        } else if (cnt === 5 || cnt === 6) {
            return "Junior";
        } else {
            return "Senior";
        }
    }

    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <input className="csvUpload" type="file" onChange={upload}/>
                    <Button variant="primary" >Upload Plan</Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{
                    hide();
                }}>Close</Button>
            </Modal.Footer>
        </Modal>
    ); 

}

