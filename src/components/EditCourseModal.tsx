import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { listHandlers } from "../interfaces/listHandlers";
import DEGREEREQS from "../assets/degreereqs.json";

export function EditCourseModal({ogClass, currClasses, visible, setVisible, setCurrCourse, lists, semesterCnt, credits} :
    {ogClass: Class, currClasses:Class[], visible: boolean, setVisible: (b: boolean) => void, setCurrCourse: (c:Class[]) => void, lists: listHandlers, semesterCnt: number, credits: creditsHandlers}) : JSX.Element {
    //console.log("in EditCourseModal with course: ", ogClass.id);
    //console.log("Curr Classes length: ", currClasses.length);
    const [courseId, setCourseId] = React.useState<string>(ogClass.id);
    const [courseName, setCourseName] = React.useState<string>(ogClass.name);
    const [courseDesc, setCourseDesc] = React.useState<string>(ogClass.description);
    const [courseCred, setCourseCred] = React.useState<number>(ogClass.credits);
    const [coursePreR, setCoursePreR] = React.useState<string[]>(ogClass.prereqs);
    const [reqId, setReqId] = useState<string>(ogClass.id);
    const [prevReq, setPrevReq] = useState<string>("");


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

        if(reqId === "Six additional credits of technical electives"){    //Yeah if I was a TA I would not want to read any of this
            credits.setTechElectiveCredits(credits.techElectiveCredits+editClass.credits);
            const copyTechList: Class[][] = lists.listOfTechElectives.map(techList => [...techList]);
            copyTechList[semesterCnt-1] = [...copyTechList[semesterCnt-1].filter(techcourses => techcourses.id != ogClass.id), editClass];
            lists.setListOfTechElectives(copyTechList);
            if(prevReq === "12 credits for an approved focus area") {  
                credits.setFocusAreaCredits(credits.focusAreaCredits-editClass.credits);   //remove credits from focus area if you switched from focus area to tech electives
                const copyFocusList: Class[][] = lists.listOfFocusClasses.map(focusList=> [...focusList]);
                copyFocusList[semesterCnt-1] = copyFocusList[semesterCnt-1].filter(focuscourses => focuscourses.id != ogClass.id);
                lists.setlistOfCourseLists(copyFocusList);
            }
        } else if (reqId === "12 credits for an approved focus area"){
            credits.setFocusAreaCredits(credits.focusAreaCredits+editClass.credits);
            const copyFocusList: Class[][] = lists.listOfFocusClasses.map(focusList => [...focusList]);
            copyFocusList[semesterCnt-1] = [...copyFocusList[semesterCnt-1].filter(focuscourses => focuscourses.id != ogClass.id), editClass];
            lists.setListOfFocusClasses(copyFocusList);
            if(prevReq === "Six additional credits of technical electives"){
                credits.setTechElectiveCredits(credits.techElectiveCredits-editClass.credits); //vice versa of above case
                const copyTechList: Class[][] = lists.listOfTechElectives.map(techList=> [...techList]);
                copyTechList[semesterCnt-1] = copyTechList[semesterCnt-1].filter(techcourses => techcourses.id != ogClass.id);
                lists.setlistOfCourseLists(copyTechList);
            }
        }

        const copyList: Class[][] = lists.listOfCourseLists.map(courseList => [...courseList]); //Something about this is broken
        copyList[semesterCnt-1] = [...copyList[semesterCnt-1].filter(courses => courses.id != ogClass.id), editClass];
        lists.setlistOfCourseLists(copyList);
        setCurrCourse(newClasses);
        setVisible(false);
    }

    const hide = () => setVisible(false);

    function handleReqClick(req: string) { 
        setPrevReq(reqId);
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
                        <Form.Control as="textarea" aria-label="course-id-input" rows={1}
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
                            value={coursePreR} onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setCoursePreR([ev.target.value])}> </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label data-testid = "CourseDegreeR">Course Fulfills the Following Degree Requirement:</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle className="DDDept" variant="primary" id="dropdown-basic">
                                {reqId}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {DEGREEREQS.filter(reqs => reqs.id.includes("credits")).map(req =>  {
                                    return (
                                        <Dropdown.Item onClick={() => handleReqClick(req.id)} key={req.id}>{req.id}</Dropdown.Item>);
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
