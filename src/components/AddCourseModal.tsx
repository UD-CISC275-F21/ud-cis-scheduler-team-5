import React from "react";
import { Button, Dropdown,  Modal, Col, Row, Form} from "react-bootstrap";
import { Class } from "../interfaces/course";
import classes from "../assets/classes.json";



export function AddCourseModal({currClasses, visible, setVisible, setCurrCourse, courseList, setCourseList} :
    {currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void, courseList: string[], setCourseList: (c: string[])=>void}) : JSX.Element {
    const [courseId, setCourseId] = React.useState<string>("Course ID");
    const [courseName, setCourseName] = React.useState<string>("Course Name");
    const [courseDesc, setCourseDesc] = React.useState<string>("Course Description");
    const [courseCred, setCourseCred] = React.useState<number>(0);
    const [coursePreR, setCoursePreR] = React.useState<string>("Course Prerequisite IDs");
    const [dept, setDept] = React.useState<string>("Course Department");
    const [visibleCourses, setVisibleCourses] = React.useState<Class[]>([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:"None"}]);
    
    function saveAdd() {
        const newClasses:Class[] = [...currClasses];
        const newClass:Class = {"id":courseId,"name":courseName, "description":courseDesc, "credits":courseCred, "prereqs":coursePreR};
        //console.log("Length of newClasses:", newClasses.length);
        setCurrCourse(newClasses.concat(newClass));
        hide();
    }
    const hide = () => {
        setDept("Course Department");
        setCourseId("Course ID");
        setVisibleCourses([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:"None"}]);

        addCourseList(newClass.id);
        console.log(courseList);
        setVisible(false);

    };

    const deptSet:Set<string> = new Set();
    for(let i = 0; i < classes.length; i++){
        const classDept = classes[i]["id"].slice(0, 4);
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
        let cIdx = -1;
        for(let i = 0; i < visibleCourses.length; i++){
            if(visibleCourses[i].id === cID){
                cIdx = i;
                break;
            }
        }
        if(cIdx != -1){
            setCourseId(cID);
            setCourseName(visibleCourses[cIdx].name);
            setCourseDesc(visibleCourses[cIdx].description);
            setCourseCred(visibleCourses[cIdx].credits);
            setCoursePreR(visibleCourses[cIdx].prereqs);
        }
    }

    const getCoursesfromDept = (d:string) : Class[] => {
        const validCourses: Class[] = [];
        for(let i = 0; i < classes.length; i++){
            if(classes[i]["id"].slice(0,4) === d){
                console.log("Found a course");
                const newClass:Class = {id:classes[i]["id"], name:classes[i]["name"], credits:classes[i]["credits"], prereqs:classes[i]["prereqs"], description:classes[i]["description"]};
                validCourses.push(newClass);
            }
        }
        return validCourses;
    };


    function addCourseList(c: string){
        setCourseList([...courseList, c]);
    }

    return (
        <Modal size="lg" show={visible} onHide={hide}>
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
                                {courseId}
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
                <Row>
                    <Col xs={6}>
                        <Form>
                            <Form.Group>
                                <Form.Label data-testid = "CourseId">Selected Course</Form.Label>
                                <Form.Control as="textarea" rows={1} 
                                    value={courseId} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCourseId(ev.target.value)}></Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <h3>Description</h3>
                        <p>{courseDesc}</p>
                        <h3>Prerequisites</h3>
                        <p>{coursePreR}</p>
                    </Col>
                </Row>
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
