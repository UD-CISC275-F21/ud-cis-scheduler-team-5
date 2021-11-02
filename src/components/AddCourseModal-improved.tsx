import React from "react";
import { Button, Dropdown,  Modal, Col, Row} from "react-bootstrap";
import { Class } from "../interfaces/course";
import classes from "../assets/classes.json";


export function AddCourseModalImproved({currClasses, visible, setVisible, setCurrCourse} :
    {currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void }) : JSX.Element {

    const [courseId, setCourseId] = React.useState<string>("Course ID");
    const [courseName, setCourseName] = React.useState<string>("Course Name");
    const [courseDesc, setCourseDesc] = React.useState<string>("Course Description");
    const [courseCred, setCourseCred] = React.useState<number>(0);
    const [coursePreR, setCoursePreR] = React.useState<string>("Course Prerequisite IDs");
    const [dept, setDept] = React.useState<string>("Course Department");
    const [courseID, setCourseID] = React.useState<string>("Course ID");
    const [visibleCourses, setVisibleCourses] = React.useState<Class[]>([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:"None"}]);
    
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


    function handleDeptClick(selectedDept:string) {
        const deptCourses:Class[] = getCoursesfromDept(selectedDept);
        console.log(deptCourses.length);
        setVisibleCourses(deptCourses);
        
        setDept(selectedDept);
    }

    function handleIDClick(cID:string) {

        setCourseID(cID);
    }

    const getCoursesfromDept = (d:string) : Class[] => {
        const validCourses: Class[] = [];
        for(let i = 0; i < classes.length; i++){
            if(classes[i]["Course ID"].slice(0,4) === d){
                console.log("Found a course");
                const newClass:Class = {id:classes[i]["Course ID"], name:classes[i]["Course Name"], credits:classes[i]["Credits"], prereqs:"none", description:classes[i]["Description"]};
                validCourses.push(newClass);
            }
        }
        return validCourses;
    };


    return (
        <Modal show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle  className="DDDept" variant="secondary" id="dropdown-basic">
                                {dept}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {deptList.map(d =>  {
                                    return (
                                        <Dropdown.Item onClick={() => handleDeptClick(d)} key = {d}>{d}</Dropdown.Item>);
                                })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="DDCourseID">
                                {courseID}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {visibleCourses.map(c =>  {
                                    console.log(visibleCourses);
                                    return (
                                        <Dropdown.Item onClick={() => handleIDClick(c.id)} key = {c.id}>{c.id}</Dropdown.Item>);
                                })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Close</Button>
                <Button variant="primary" onClick={saveAdd}>Add Course</Button>
            </Modal.Footer>
        </Modal>
    );

}