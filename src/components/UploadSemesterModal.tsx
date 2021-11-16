import React, { ReactChild, ReactEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {sem} from "../interfaces/sem";
import {Class} from "../interfaces/course";
import { readFile } from "fs";
//import { ReactFileReader } from "react-file-reader";

export function UploadSemesterModal({visible, setVisible, plan, setPlan}: {visible: boolean, setVisible: (b: boolean) => void, plan: sem[], setPlan: (s: sem[])=>void}): JSX.Element {
    //const [file, setFile] = useState<File>();

    const hide = () => setVisible(false);

    function upload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files !== null){
            const file = e.currentTarget.files[0];
            console.log(file);
            const readfile = new FileReader();
            readfile.readAsText(file);
            readfile.onload = async(e) => {
                console.log(e.target?.result);
                const planCSV = e.target?.result;
                const plsWork = String(planCSV);
                buildPlan(plsWork);

            };
        } else {
            return;
        }
    }

    function buildPlan(csv: string) {
        const headerEnd = csv.indexOf("\n");
        let newPlanRaw: string[] = [];
        let newLine: string;
        let newNode: string;
        let planCooking: string[] = [];
        let parser = headerEnd;
        let parserTmp = 0;
        while (parser !== -1) {
            parserTmp = csv.indexOf("\n",parser+1);
            newLine = csv.slice(parser,parserTmp);
            newPlanRaw = newPlanRaw.concat([newLine]);
            parser = parserTmp;
        }
        newPlanRaw.forEach(c=>{
            parser = 0;
            while(parser !== -1) {

                // Parse through each classes and get the data

                // LOL

                parserTmp = c.indexOf(",",parser+1);
                newNode = c.slice(parser,parserTmp);
                planCooking = planCooking.concat(...[newNode]);
                parser = parserTmp;


            }
        });
        console.log(planCooking);
        console.log(newPlanRaw);
    }




    function saveUpload() {
        //TODO convert CSV to sem format
        //hide();
        return 1;
    }


    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <input className="csvUpload" type="file" onChange={upload}/>
                    <Button variant="primary" onClick={saveUpload}>Upload Plan</Button>
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

