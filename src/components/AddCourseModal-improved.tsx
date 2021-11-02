import React from "react";
import { Button, Dropdown,  Modal } from "react-bootstrap";
import { Class } from "../interfaces/course";
import classes from "../assets/classes.json";


export function AddCourseModalImproved({currClasses, visible, setVisible, setCurrCourse} :
    {currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void }) : JSX.Element {

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
        setVisible(false);
    }
    const hide = () => setVisible(false);

    const deptSet:Set<string> = new Set();
    for(let i = 0; i < classes.length; i++){
        const classDept = classes[i]["Course ID"].slice(0, 4);
        deptSet.add(classDept);
    }
    const deptList:string[] = [];
    deptSet.forEach(function(dept){
        deptList.push(dept);
    });

    console.log(deptList);


    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Course Department
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {deptList.map(d =>  {
                            return (
                                <Dropdown.Item key = {d}>{d}</Dropdown.Item>);
                        })
                        }
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Close</Button>
                <Button variant="primary" onClick={saveAdd}>Add Course</Button>
            </Modal.Footer>
        </Modal>
    );

}