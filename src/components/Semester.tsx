import React from "react";
import { Card as BootstrapCard, Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import Course from "./Course";
import { EditSemesterModal } from "./EditSemesterModal";


export function Semester({courseList, setCourseList}: {courseList: string[], setCourseList: (c: string[])=>void}): JSX.Element {
    //console.log("in Semester");
    const nullClasses:Class[] =[ {id:"CISC275", name:"Intro to Software Engineering", description:"Course1", credits:3, prereqs:"None"},
        {id:"CISC106", name:"Intro to Computer Engineering", description:"Course2", credits:3, prereqs:"None"},
        {id:"PHYS207", name:"Fundamentals of Physics 1", description:"Probably the best course at UD", credits:4, prereqs:"None"},
        {id:"MATH241", name:"Calculus 1", description:"What's a derivative?", credits:4, prereqs:"None"}
    ];

    const [classYear,setClassYear] = React.useState<string>("____ Year");
    const [season,setSeason] = React.useState<string>("____ Semester");
    const [currClasses, setCurrClasses] = React.useState<Class[]>(nullClasses);
    const [visible, setVisible] = React.useState<boolean>(false);

    function editCard() {
        setVisible(true);
    }

    function displayCurrClasses(currClass: Class[]){
        let i = 0;
        for(i = 0; i < currClass.length; i++){
            console.log(currClass[i].id);
            addCourse(currClass[i].id);
            console.log(courseList);
        }
    }

    function addCourse(c: string){
        setCourseList([...courseList, c]);
    }

    return <BootstrapCard className="border-dark">
        <Col>
            <div className="semester-title">
                <strong>{classYear}: {season} <button onClick={editCard}>Edit Semester</button></strong>
                <EditSemesterModal classYear={classYear} season={season} setClassYear={setClassYear} setSeason = {setSeason} visible={visible} setVisible={setVisible}></EditSemesterModal>
            </div>
            <Row>
                <Col><strong>Course ID</strong></Col>
                <Col><strong>Course Name</strong></Col>
                <Col><strong>Description</strong></Col>
                <Col><strong>Credits</strong></Col>
                <Col><strong>Click Here to Edit Course</strong></Col>
            </Row>

            {currClasses.map(c => {
                return (
                    <Row key = {c.id}>
                        <Course course={c} currCourses={currClasses} setCurrCourses={setCurrClasses} courseList = {courseList} setCourseList={setCourseList}></Course>
                    </Row>
                );
            })
            }
            
            {displayCurrClasses(currClasses)}

            {/*
            <Row>
                <Course course={{id:"CISC275", name:"Intro to Software Engineering", description:"Course1", credits:3, prereqs:"None"}}></Course>
            </Row>
            <Row>
                <Course course = {{id:"CISC106", name:"Intro to Computer Science", description:"Course2", credits:3, prereqs:"None"}}></Course>
            </Row>
            <Row>
                <Course course = {{id:"PHYS207", name:"Fundamentals of Physics 1", description:"Probably the best course at UD", credits:4, prereqs:"None"}}></Course>
            </Row>
            <Row>
                <Course course = {{id:"MATH241", name:"Calculus 1", description:"What's a derivative?", credits:4, prereqs:"None"}}></Course>
            </Row>
            */}
            <p></p>
        </Col> 
    </BootstrapCard>;
}

export default Semester;