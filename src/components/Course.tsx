import React from "react";
import { Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { EditCourseModal } from "./EditCourseModal";

function Course({course, currCourses, setCurrCourses} : {course:Class, currCourses:Class[], setCurrCourses:(courses:Class[]) => void}): JSX.Element {
    const [visible, setVisible] = React.useState<boolean>(false);
    function editCourse():void{
        //console.log("set visible ", course);
        setVisible(true);
    }

    function removeCourse():void{
        //probably want to put a "Are You Sure?" warning here
        let newCourses:Class[] = [];
        for (let index = 0; index < currCourses.length; index++) {
            if(currCourses[index].id == course.id){
                continue;
            }else{
                newCourses = newCourses.concat(currCourses[index]);
            }
        }
        setCurrCourses(newCourses);
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
            <Col><button onClick={removeCourse}>Remove</button></Col>
            <EditCourseModal ogClass={course} currClasses={currCourses} setCurrCourse={setCurrCourses} visible={visible} setVisible={setVisible}></EditCourseModal>
        </Row>

            
    );
}

export default Course;