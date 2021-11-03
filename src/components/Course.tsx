import React from "react";
import { Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { EditCourseModal } from "./EditCourseModal";

function Course({course, currCourses, setCurrCourses, courseList, setCourseList} : 
    {course:Class, currCourses:Class[], setCurrCourses:(courses:Class[]) => void, courseList: string[], setCourseList: (c: string[])=>void}): JSX.Element {
    const [visible, setVisible] = React.useState<boolean>(false);
    function editCourse(){
        //console.log("set visible ", course);
        setVisible(true);
    }

    
    //console.log("in Course");
    //console.log(course.id);
    return (
        <Row>
            <Col>{course.id}</Col>
            <Col>{course.name}</Col>
            <Col>{course.description}</Col>
            <Col>{course.credits}</Col>
            <Col><button onClick={editCourse}>Edit</button></Col>
            <EditCourseModal ogClass={course} currClasses={currCourses} setCurrCourse={setCurrCourses} visible={visible} setVisible={setVisible}></EditCourseModal>
        </Row>

            
    );
}

export default Course;