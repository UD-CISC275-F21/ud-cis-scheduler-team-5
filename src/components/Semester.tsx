import React from "react";
import "../App.css";
import { Button, Card as BootstrapCard, Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import Course from "./Course";
import { EditSemesterModal } from "./EditSemesterModal";
import { AddCourseModal } from "./AddCourseModal";



export function Semester({semesterCourses, setSemesterCourses, courseList, setCourseList}: {semesterCourses: Class[], setSemesterCourses: (c: Class[])=>void, courseList: string[], setCourseList: (c: string[])=>void}): JSX.Element {
    //console.log("in Semester");
  
    const [addCourseVisible, setAddCourseVisible] = React.useState<boolean>(false);
    const [classYear,setClassYear] = React.useState<string>("____ Year");
    const [season,setSeason] = React.useState<string>("____ Semester");
    const [currClasses, setCurrClasses] = React.useState<Class[]>(semesterCourses);
    const [visible, setVisible] = React.useState<boolean>(false);


    function editCard() {
        setVisible(true);
    }

    function addCourse() : void {
        setAddCourseVisible(true);
        setSemesterCourses(currClasses);
    }

    return <BootstrapCard className="border-dark">
        <Col>
            <div className="semester-title">
                <strong>{classYear}: {season} <button onClick={editCard}>Edit Semester</button></strong>
                <EditSemesterModal classYear={classYear} season={season} setClassYear={setClassYear} setSeason = {setSeason} visible={visible} setVisible={setVisible}></EditSemesterModal>
            </div>
            <Row>
                <Col><strong>Remove Course</strong></Col>
                <Col><strong>Course ID</strong></Col>
                <Col><strong>Course Name</strong></Col>
                <Col><strong>Description</strong></Col>
                <Col><strong>Credits</strong></Col>
                <Col><strong>Edit Course</strong></Col>
            </Row>

            {currClasses.map(c => {
                return (
                    <Row key = {c.id}>
                        <Course course={c} currCourses={currClasses} setCurrCourses={setCurrClasses} courseList={courseList} setCourseList={setCourseList}></Course>
                    </Row>
                );
            })
            }
            <p></p>
            <Button className="addCourse" onClick={addCourse}>Add New Course</Button>
            <AddCourseModal currClasses={currClasses} visible={addCourseVisible} setVisible={setAddCourseVisible} setCurrCourse={setCurrClasses} courseList={courseList} setCourseList={setCourseList}></AddCourseModal>
        </Col>
    </BootstrapCard>;
}

export default Semester;
