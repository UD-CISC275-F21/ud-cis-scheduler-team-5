import React from "react";
import "../App.css";
import { Button, Dropdown,  Modal, Col, Row, Form} from "react-bootstrap";
import { Class } from "../interfaces/course";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { listHandlers } from "../interfaces/listHandlers";
//import classes from "../assets/classes.json";
import { courseMap } from "../utilities/extractClasses";


export function AddCourseModal({currClasses, visible, setVisible, setCurrCourse, lists, semesterCnt} :
    {currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void, lists: listHandlers, semesterCnt: number, credits: creditsHandlers}) : JSX.Element {
    const [courseId, setCourseId] = React.useState<string>("Course ID");
    const [courseName, setCourseName] = React.useState<string>("Course Name");
    const [courseDesc, setCourseDesc] = React.useState<string>("");
    const [courseCred, setCourseCred] = React.useState<number>(0);
    const [coursePreR, setCoursePreR] = React.useState<string>("");
    const [dept, setDept] = React.useState<string>("Course Department");
    const [visibleCourses, setVisibleCourses] = React.useState<Class[]>([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:"None"}]);
    const [visibleDepts, setVisibleDepts] = React.useState<string[]>(Object.keys(courseMap));
    const [errorAddCourse, setErrorAddCourse] = React.useState<boolean>(false);
    const [courseSearch, setCourseSearch] = React.useState<string>("Course ID");
    const [deptSearch, setDeptSearch] = React.useState<string>("Department");


    function saveAdd() {
        const newClasses:Class[] = [...currClasses];
        const newClass:Class = {"id":courseId,"name":courseName, "description":courseDesc, "credits":courseCred, "prereqs":coursePreR};
        const prereqs = newClass.prereqs;  //changing app to make it complatibale with new courseData.josn
        console.log(newClass);
        /*if(prereqs[0] === "000"){//This is an error code if the the inputted course is not found in courseMap
            setErrorAddCourse(true);
            console.log("That's an unrecognized course");
        }else if(prereqs[0] === "N/A" || prereqs[0] === "" || prereqs.length===0){
            setCurrCourse(newClasses.concat(newClass));
            credits.setGlobalCredits(credits.globalCredits+courseCred);
            addlistOfCourseLists(newClass);
            hide();
        }else{
            let loc = -1;
            for(let i = 0; i < lists.listOfCourseLists.length-1; i++){
                for(let j = 0; j < lists.listOfCourseLists[i].length; j++){
                    for(let k = 0; k < prereqs.length; k++){
                        console.log("Checking course: ", lists.listOfCourseLists[i][j]);
                        if(lists.listOfCourseLists[i][j].id === prereqs[k]){
                            loc = i;
                        }
                    }
                }
            }
            if(loc != -1){*/
        setCoursePreR(prereqs);
        setCurrCourse(newClasses.concat(newClass));
        addlistOfCourseLists(newClass);
        hide();
        /*}else{
                setErrorAddCourse(true);
                console.log("Can't add that course yet!");
            }  
        }*/
    }
    const hide = () => {
        setErrorAddCourse(false);
        setCourseSearch("Course ID");
        setDeptSearch("Course Department");
        setDept("Course Department");
        setCourseId("Course ID");
        setCourseName("Course Name");
        setCourseDesc("Course Description");
        setCourseCred(0);
        setCoursePreR("");
        setVisibleCourses([{"id":"None", "name":"None", "description":"None", "credits":0, "prereqs":"None"}]);
        setVisibleDepts(Object.keys(courseMap));
        setVisible(false);
    };

    function handleDeptSearch(partOfDept:string){
        setDeptSearch(partOfDept);
        const len = partOfDept.length;
        const depts:string[] = Object.keys(courseMap);
        console.log("First attempt: ", depts[0].slice(0,len));
        let validDepts:string[] = [];
        validDepts = depts.filter( dept => dept.slice(0,len) === partOfDept);
        if(validDepts.length===0){
            return;
        }else if(validDepts.length === 1 && len === 4){
            handleDeptClick(validDepts[0]);
            setVisibleDepts(validDepts);
        }else{
            setCourseSearch("Course ID");
            setDept("Course Department");
            setCourseId("Course ID");
            setVisibleDepts(validDepts);
            setVisibleCourses([{"id":"None", "name":"None", "description":"None", "credits":0, prereqs:"None"}]);
        }
        
    }

    function handleCourseSearch(partOfID:string){
        setCourseSearch(partOfID);
        const len = partOfID.length;
        if(len < 4){
            return;
        }
        if(courseMap[partOfID.slice(0,4)] === undefined){
            console.log("Not a valid department");
        }else{
            const validCourses = courseMap[partOfID.slice(0,4)].filter(c => c.id.slice(0,len) === partOfID);
            if(validCourses.length === 1 && len === 7){
                handleIDClick(validCourses[0].id);
            }
            
           
        }
        return;
    }

    function handleDeptClick(selectedDept:string) {
        const deptCourses:Class[] = courseMap[selectedDept];
        setCourseId("Course ID");
        setDeptSearch(selectedDept);
        setVisibleCourses(deptCourses);
        setCourseSearch(selectedDept);
        setDept(selectedDept);
    }

    function handleIDClick(cID:string) {
        setErrorAddCourse(false);
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
            console.log(visibleCourses[cIdx].name);
            setCourseDesc(visibleCourses[cIdx].description);
            setCourseCred(visibleCourses[cIdx].credits);
            setCoursePreR(getPrereqs(visibleCourses[cIdx].id));
        }
    }

    function getPrereqs(selectedCourse:string) : string{
        console.log("Looking for ", selectedCourse);
        const deptCourses = courseMap[selectedCourse.slice(0,4)];
        //let loc = -1;
        for(let i = 0; i < deptCourses.length; i++){
            console.log(deptCourses[i].id);
            if(deptCourses[i].id === selectedCourse){
                return deptCourses[i].prereqs;
                //loc = i;
                //break;
            }
        }
        return "";
        /*let prereqs:string;
        if(loc !== -1){
            prereqs = deptCourses[loc].prereqs;
            console.log(prereqs);
            for(let i = 0; i < prereqs.length; i++){
                const tmp = prereqs[i].split(" ");
                if(tmp[1] === undefined){
                    prereqs = tmp[0];
                }else{
                    console.log("idx 0: ", tmp[0], "\tidx1: ", tmp[1]);
                    prereqs = tmp[0] + tmp[1];
                }
            }
        }else{
            prereqs = "N/A";
        }
        console.log("Prereqs: ", prereqs, "\tLength: ", prereqs.length);
        return prereqs;*/
    }


    function addlistOfCourseLists(c: Class){
        const copyList: Class[][] = lists.listOfCourseLists.map(courseList=> [...courseList]);
        copyList[semesterCnt-1] = [...copyList[semesterCnt-1], c];
        lists.setlistOfCourseLists(copyList);
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
                            <Dropdown.Toggle className="DDDept" variant="secondary" id="dropdown-basic" data-testid="dept-dropdown">
                                {dept}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown" data-testid="dept-drop-menu">
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

                            <Dropdown.Menu data-testid="course-drop-menu">
                                {visibleCourses.map(c =>  {
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
                        <p style={{color: "red"}}>{coursePreR}</p>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>Close</Button>
                <Button data-testid="add-course-button" variant="primary" onClick={()=>{
                    saveAdd(); 
                }}>Add Course</Button>
            </Modal.Footer>
        </Modal>
    );

}
