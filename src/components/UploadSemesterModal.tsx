import React, { ReactChild, ReactEventHandler, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {sem} from "../interfaces/sem";
import {Class} from "../interfaces/course";

export function UploadSemesterModal({visible, setVisible, plan, setPlan}: {visible: boolean, setVisible: (b: boolean) => void, plan: sem[], setPlan: (s: sem[])=>void}): JSX.Element {
    //const [file, setFile] = useState<File>();

    const hide = () => setVisible(false);

    function upload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files !== null){
            const file = e.currentTarget.files[0];
            console.log(file);
            const readfile = new FileReader();
            readfile.onloadstart = async(ev) => {
                console.log("123");
                const txt = (ev.target?.result);
                console.log(ev.target);
                console.log("yee");
                console.log(txt);
                buildPlan(txt);
            };
        } else {
            return;
        }
    }

    function buildPlan(csv: string | ArrayBuffer | null | undefined) {
        if (csv) {
            let userPlan: sem[];
            let userCourse: Class[];
            const csv1 = csv?.toString;
            console.log("build");
            let i = 0;
            for (i;i<csv1.length;i++) {
                console.log(csv1);


            }
        }


    }

    function saveUpload() {
        //TODO convert CSV to sem format
        hide();
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
