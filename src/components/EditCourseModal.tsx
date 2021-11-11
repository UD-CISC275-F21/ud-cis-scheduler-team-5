import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Class } from "../interfaces/course";
import DEGREEREQS from "../assets/degreereqs.json";

export function EditCourseModal({ogClass, currClasses, visible, setVisible, setCurrCourse, courseList, setCourseList} :
    {ogClass: Class, currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void, courseList: string[], setCourseList: (c: string[])=>void}) : JSX.Element {
    //console.log("in EditCourseModal with course: ", ogClass.id);
    //console.log("Curr Classes length: ", currClasses.length);
    const [courseId, setCourseId] = React.useState<string>(ogClass.id);
    const [courseName, setCourseName] = React.useState<string>(ogClass.name);
    const [courseDesc, setCourseDesc] = React.useState<string>(ogClass.description);
    const [courseCred, setCourseCred] = React.useState<number>(ogClass.credits);
    const [coursePreR, setCoursePreR] = React.useState<string>(ogClass.prereqs);
    const [reqId, setReqId] = useState<string>(ogClass.id);


    function saveEdit() {
        const editClass:Class = {name: courseName, id:courseId, description: courseDesc, credits: courseCred, prereqs: coursePreR};
        let cIdx = -1;//index of edit class set to -1 for test purposes. If ogClass id is not in the currentClasses
        for (let index = 0; index < currClasses.length; index++) {
            if (currClasses[index].id === ogClass.id) {
                //console.log("Found the matching course at idx=", index);
                cIdx = index;
                break;
            }
        }
        const newClasses:Class[] = [...currClasses];
        newClasses[cIdx] = editClass;
        //console.log("Length of newClasses:", newClasses.length);
        for (let index = 0; index < newClasses.length; index++) {
            //console.log("ID: ", newClasses[index].id);
            //console.log("Type: ", typeof newClasses[index]);
            
        }

        setCurrCourse(newClasses);
        setVisible(false);
    }
    //console.log("Modal Course: ", ogClass.id);

    const hide = () => setVisible(false);

    function handleReqClick(req: string) {
        setCourseList([...courseList.filter(courses => courses != reqId), req]);
        setReqId(req);
    }

    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label data-testid = "CourseId">Course ID</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={courseId} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCourseId(ev.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "CourseName">Course Name</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={courseName} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCourseName(ev.target.value)}> </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "CourseDesc">Course Description</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={courseDesc} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCourseDesc(ev.target.value)}> </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "CourseCred">Course Credits</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={courseCred} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCourseCred(Number(ev.target.value))}> </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "CoursePreR">Course Pre-Requisites</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={coursePreR} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCoursePreR(ev.target.value)}> </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "CourseDegreeR">Course Fulfills the Following Degree Requirement:</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle  className="DDDept" variant="primary" id="dropdown-basic">
                                {reqId}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {DEGREEREQS.map(req =>  {
                                    return (
                                        <Dropdown.Item onClick={() => handleReqClick(req.id)} key = {req.id}>{req.id}</Dropdown.Item>);
                                })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Close</Button>
                <Button variant="primary" onClick={saveEdit}>Edit Course</Button>
            </Modal.Footer>
        </Modal>
    );

}
