import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export function EditSemesterModal({classYear, season, visible, setClassYear, setSeason, setVisible}: 
    {classYear: string, season: string, visible: boolean, setClassYear: (s: string) => void, setSeason: (s: string) => void, setVisible: (b: boolean) => void}): JSX.Element {
    

    const hide = () => setVisible(false);
    
    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header>
                <Modal.Title>Edit Semester</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label data-testid = "ClassYear">Class Year</Form.Label>
                        <Form.Control as="textarea" rows={1} aria-label="sem-class-year"
                            value={classYear} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setClassYear(ev.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "Season">Season Semester</Form.Label>
                        <Form.Control as="textarea" rows={1} aria-label="sem-season"
                            value={season} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setSeason(ev.target.value)}> </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={hide}>Edit</Button>
                <Button variant="secondary" onClick={hide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

//<Button variant="primary" onClick={saveEdit}>Edit Course</Button>