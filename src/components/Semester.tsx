import React from "react";
import "../App.css";
import { Button, Card as BootstrapCard, Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import Course from "./Course";
import { EditSemesterModal } from "./EditSemesterModal";
import { AddCourseModal } from "./AddCourseModal";



export function Semester(): JSX.Element {
    //console.log("in Semester");
    const nullClasses:Class[] =[ {id:"CISC275", name:"Intro to Software Engineering", description:"Course1", credits:3, prereqs:"None"},
        {id:"CISC106", name:"Intro to Computer Engineering", description:"Course2", credits:3, prereqs:"None"},
        {id:"PHYS207", name:"Fundamentals of Physics 1", description:"Probably the best course at UD", credits:4, prereqs:"None"},
        {id:"MATH241", name:"Calculus 1", description:"What's a derivative?", credits:4, prereqs:"None"}
    ];
  
    const [addCourseVisible, setAddCourseVisible] = React.useState<boolean>(false);
    const [classYear,setClassYear] = React.useState<string>("____ Year");
    const [season,setSeason] = React.useState<string>("____ Semester");
    const [currClasses, setCurrClasses] = React.useState<Class[]>(nullClasses);
    const [visible, setVisible] = React.useState<boolean>(false);

    function editCard() {
        setVisible(true);
    }

    function addCourse() : void {
        setAddCourseVisible(true);
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
                        <Course course={c} currCourses={currClasses} setCurrCourses={setCurrClasses}></Course>
                    </Row>
                );
            })
            }
            <p></p>
            <Button className="addCourse" onClick={addCourse}>Add New Course</Button>
            <AddCourseModal currClasses={currClasses} visible={addCourseVisible} setVisible={setAddCourseVisible} setCurrCourse={setCurrClasses}></AddCourseModal>
        </Col>
    </BootstrapCard>;
}

export default Semester;