import React from "react";
import { Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { EditCourseModal } from "./EditCourseModal";
import x from "../assets/x.svg";

function Course({course, currCourses, setCurrCourses, courseList, setCourseList} : 
    {course:Class, currCourses:Class[], setCurrCourses:(courses:Class[]) => void, courseList: string[], setCourseList: (c: string[])=>void}): JSX.Element {
    const [visible, setVisible] = React.useState<boolean>(false);
    function editCourse():void{
        //console.log("set visible ", course);
        //removeCourseList(course.id);
        setVisible(true);
    }

    function removeCourse():void{
        //probably want to put a "Are You Sure?" warning here
        let newCourses:Class[] = [];
        for (let index = 0; index < currCourses.length; index++) {
            if(currCourses[index].id == course.id){
                removeCourseList(currCourses[index].id);
                continue;
            }else{
                newCourses = newCourses.concat(currCourses[index]);
            }
        }
        setCurrCourses(newCourses);
    }

    function removeCourseList(c: string) { 
        setCourseList(courseList.filter(courses => courses != c));
    }

    return (
        <Row>
            <Col>
                <button className="removeCourse" onClick={removeCourse} margin-top={"0.2em"} margin-bottom="0.2em">
                    <img src={x} alt="Remove Course Button"/>
                </button>
            </Col>
            <Col>{course.id}</Col>
            <Col>{course.name}</Col>
            {/*
            <Col>{course.description}</Col>
            */}
            <Col>{course.credits}</Col>
            <Col><button onClick={editCourse}>Edit</button></Col>
            <EditCourseModal ogClass={course} currClasses={currCourses} setCurrCourse={setCurrCourses} visible={visible} setVisible={setVisible} courseList={courseList} setCourseList={setCourseList}></EditCourseModal>
        </Row>

            
    );
}

export default Course;