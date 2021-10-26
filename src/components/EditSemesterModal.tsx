import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Class } from "../interfaces/course";

export function EditSemesterModal({classYear, season, visible, setClassYear, setSeason, setVisible}: 
    {classYear: string, season: string, visible: boolean, setClassYear: (s: string) => void, setSeason: (s: string) => void, setVisible: (b: boolean) => void}): JSX.Element {
    
    /* function saveEdit(){
        
    } */

    const hide = () => setVisible(false);
    
    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label data-testid = "ClassYear">Course ID</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={classYear} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setClassYear(ev.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "Season">Course Name</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={season} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setSeason(ev.target.value)}> </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={hide}>Edit Course</Button>
                <Button variant="secondary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

//<Button variant="primary" onClick={saveEdit}>Edit Course</Button>