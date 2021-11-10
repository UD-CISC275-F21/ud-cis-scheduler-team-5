import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {sem} from "../interfaces/sem";


export function UploadSemesterModal({visible, setVisible, plan, setPlan}: {visible: boolean, setVisible: (b: boolean) => void, plan: sem[], setPlan: (s: sem[])=>void}): JSX.Element {

    const hide = () => setVisible(false);

    function upload() {
        //setPlan();
        return 1;
    }


    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <input type="file" ref={plan} />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{
                    hide();
                }}>Close</Button>
                <Button variant="primary" onClick={upload}>Upload Plan</Button>
            </Modal.Footer>
        </Modal>
    ); 

}
