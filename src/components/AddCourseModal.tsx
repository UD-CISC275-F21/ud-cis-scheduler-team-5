import React from "react";
import "../App.css";
import { Button, Dropdown,  Modal, Col, Row, Form} from "react-bootstrap";
import { Class } from "../interfaces/course";
//import classes from "../assets/classes.json";
import { courseMap } from "../utilities/extractClasses";


export function AddCourseModal({currClasses, visible, setVisible, setCurrCourse, courseList, setCourseList} :
    {currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void, courseList: string[], setCourseList: (c: string[])=>void}) : JSX.Element {
    const [courseId, setCourseId] = React.useState<string>("Course ID");
    const [courseName, setCourseName] = React.useState<string>("Course Name");
    const [courseDesc, setCourseDesc] = React.useState<string>("Course Description");
    const [courseCred, setCourseCred] = React.useState<number>(0);
    const [coursePreR, setCoursePreR] = React.useState<string[]>(["Course Prerequisite IDs"]);
    const [dept, setDept] = React.useState<string>("Course Department");
    const [visibleCourses, setVisibleCourses] = React.useState<Class[]>([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:["None"]}]);
    const [visibleDepts, setVisibleDepts] = React.useState<string[]>(Object.keys(courseMap));
    const [errorAddCourse, setErrorAddCourse] = React.useState<boolean>(false);
    const [courseSearch, setCourseSearch] = React.useState<string>("Course ID");
    const [deptSearch, setDeptSearch] = React.useState<string>("Department");


    //const deptList:string[] = courseMap.e

    function saveAdd() {
        const newClasses:Class[] = [...currClasses];
        const newClass:Class = {"id":courseId,"name":courseName, "description":courseDesc, "credits":courseCred, "prereqs":coursePreR};
        //console.log("Length of newClasses:", newClasses.length);
        const prereqs = getPrereqs(courseId);
 
        if(prereqs[0] === "N/A" || prereqs[0] === "" || prereqs.length===0){
            setCurrCourse(newClasses.concat(newClass));
            addCourseList(newClass.id);
            hide();
        }else{
            let loc = -1;
            for(let i = 0; i < courseList.length; i++){
                for(let j = 0; j < prereqs.length; j++){
                    if(courseList[i] === prereqs[j]){
                        loc = i;
                    }
                }
            }
            if(loc != -1){
                setCurrCourse(newClasses.concat(newClass));
                addCourseList(newClass.id);
                hide();
            }else{
                setErrorAddCourse(true);
                console.log("Can't add that course yet!");
            }  
        }
        //console.log(courseList);
    }
    const hide = () => {
        setErrorAddCourse(false);
        setCourseSearch("Course ID");
        setDeptSearch("Courese Department");
        setDept("Course Department");
        setCourseId("Course ID");
        setCourseDesc("Course Description");
        setCoursePreR([""]);
        setVisibleCourses([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:["None"]}]);
        setVisibleDepts(Object.keys(courseMap));
        setVisible(false);

    };

    function handleDeptSearch(partOfDept:string){
        setDeptSearch(partOfDept);
        const len = partOfDept.length;
        const depts:string[] = Object.keys(courseMap);
        console.log("First attempt: ", depts[0].slice(0,len));
        let validDepts:string[] = [];
        //const validCourses:Class[] = [];
        validDepts = depts.filter( dept => dept.slice(0,len) === partOfDept);
        if(validDepts.length===0){
            return;
        }else if(validDepts.length === 1){
            handleDeptClick(validDepts[0]);
            setVisibleDepts(validDepts);
        }else{
            setCourseSearch("Course ID");
            setDept("Course Department");
            setCourseId("Course ID");
            setVisibleDepts(validDepts);
            setVisibleCourses([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:["None"]}]);
        //setVisibleCourses(validCourses);
        }
        
    }

    function handleCourseSearch(partOfID:string){
        setCourseSearch(partOfID);
        const len = partOfID.length;
        if(len < 4){
            return;
        }
        const validCourses = courseMap[partOfID.slice(0,4)].filter(c => c.id.slice(0,len) === partOfID);
        setVisibleCourses(validCourses);
        return;
    }

    function handleDeptClick(selectedDept:string) {
        const deptCourses:Class[] = courseMap[selectedDept];
        //getCoursesfromDept(selectedDept);
        //console.log(deptCourses.length);
        setVisibleCourses(deptCourses);
        setCourseSearch(selectedDept);
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

    /*

    const getCoursesfromDept = (d:string) : Class[] => {
        const validCourses: Class[] = [];
        for(let i = 0; i < classes.length; i++){
            if(classes[i]["id"].slice(0,4) === d){
                //console.log("Found a course");
                const newClass:Class = {id:classes[i]["id"], name:classes[i]["name"], credits:classes[i]["credits"], prereqs:classes[i]["prereqs"], description:classes[i]["description"]};
                validCourses.push(newClass);
            }
        }
        return validCourses;
    };

    */

    function getPrereqs(selectedCourse:string) : string[]{
        console.log("Looking for ", selectedCourse);
        const deptCourses = courseMap[selectedCourse.slice(0,4)];
        //getCoursesfromDept(selectedCourse.slice(0,4));
        let loc = -1;
        for(let i = 0; i < deptCourses.length; i++){
            console.log(deptCourses[i].id);
            if(deptCourses[i].id === selectedCourse){
                console.log("Course is in the list");
                loc = i;
                break;
            }
        }
        let prereqs:string[];
        if(loc !== -1){
            prereqs = deptCourses[loc].prereqs;
        }else{
            prereqs = ["N/A"];
        }
        console.log("Prereqs: ", prereqs);
        return prereqs;
    }


    function addCourseList(c: string){
        setCourseList([...courseList, c]);
    }

    return (
        <Modal size="lg" show={visible} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className="myRow">
                    <Col className="myCol">
                        <Form>
                            <Form.Group>
                                <Form.Label data-testid = "DeptSearch">Department Search</Form.Label>
                                <Form.Control as="textarea" rows={1} 
                                    value={deptSearch} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => handleDeptSearch(ev.target.value)}></Form.Control>
                            </Form.Group>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle  className="DDDept" variant="secondary" id="dropdown-basic">
                                {dept}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown">
                                {visibleDepts.map(dept=>{
                                    return <Dropdown.Item onClick={() => handleDeptClick(dept)} key = {dept}>{dept}</Dropdown.Item>;
                                })

                                }
                            
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label data-testid = "CourseSearch">Course Search</Form.Label>
                                <Form.Control as="textarea" rows={1} 
                                    value={courseSearch} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => handleCourseSearch(ev.target.value)}></Form.Control>
                            </Form.Group>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="DDCourseID">
                                {courseId}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {visibleCourses.map(c =>  {
                                    //console.log(visibleCourses);
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
                            {errorAddCourse && <p>Cannot add this course!</p>}
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
