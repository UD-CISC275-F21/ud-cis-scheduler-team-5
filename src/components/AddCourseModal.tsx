import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Class } from "../interfaces/course";

export function AddCourseModal({currClasses, visible, setVisible, setCurrCourse, courseList, setCourseList} :
    {currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void, courseList: string[], setCourseList: (c: string[])=>void}) : JSX.Element {
    const [courseId, setCourseId] = React.useState<string>("Course ID");
    const [courseName, setCourseName] = React.useState<string>("Course Name");
    const [courseDesc, setCourseDesc] = React.useState<string>("Course Description");
    const [courseCred, setCourseCred] = React.useState<number>(0);
    const [coursePreR, setCoursePreR] = React.useState<string>("Course Prerequisite IDs");


    function saveAdd() {
        const newClasses:Class[] = [...currClasses];
        const newClass:Class = {"id":courseId,"name":courseName, "description":courseDesc, "credits":courseCred, "prereqs":coursePreR};
        //console.log("Length of newClasses:", newClasses.length);
        setCurrCourse(newClasses.concat(newClass));
        addCourseList(newClass.id);
        console.log(courseList);
        setVisible(false);
    }
    //console.log("Modal Course: ", ogClass.id);

    const hide = () => setVisible(false);

    /*function displayCurrClasses(currClass: Class[]){
        let i = 0;
        for(i = 0; i < currClass.length; i++){
            addCourseList(currClass[i].id);
        }
    } */

    function addCourseList(c: string){
        console.log(c);
        setCourseList([...courseList, c]);
    }

    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
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
                        <Form.Label data-testid = "CoursePreR">Course Pre Requisits</Form.Label>
                        <Form.Control as="textarea" rows={1} 
                            value={coursePreR} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCoursePreR(ev.target.value)}> </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Close</Button>
                <Button variant="primary" onClick={()=>{
                    saveAdd(); //displayCurrClasses(currClasses);
                }}>Add Course</Button>
            </Modal.Footer>
        </Modal>
    );

}
