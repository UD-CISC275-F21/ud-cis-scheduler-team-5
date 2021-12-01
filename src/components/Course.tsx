import React from "react";
import { Col, Row } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { listHandlers } from "../interfaces/listHandlers";
import { EditCourseModal } from "./EditCourseModal";
import x from "../assets/x.svg";

function Course({course, currCourses, setCurrCourses, lists, semesterCnt, credits} : 
    {course:Class, currCourses:Class[], setCurrCourses:(courses:Class[]) => void, lists: listHandlers, semesterCnt: number, credits: creditsHandlers}): JSX.Element {
    const [visible, setVisible] = React.useState<boolean>(false);
    
    function editCourse():void{
        setVisible(true);
    }

    function removeCourse():void{
        //probably want to put a "Are You Sure?" warning here
        let newCourses:Class[] = [];
        for (let index = 0; index < currCourses.length; index++) {
            if(currCourses[index].id === course.id){
                //removelistOfCourseLists(currCourses[index].id);
                continue;
            }else{
                newCourses = newCourses.concat(currCourses[index]);
            }
        }
        removelistOfCourseLists();
        removeTechElectives();
        removeFocusClasses();
        setCurrCourses(newCourses);
    }

    function removelistOfCourseLists() { 
        for(let i = 0; i < lists.listOfCourseLists[semesterCnt-1].length; i++){
            if(lists.listOfCourseLists[semesterCnt-1][i].id === course.id) {
                credits.setGlobalCredits(credits.globalCredits - lists.listOfCourseLists[semesterCnt-1][i].credits);
                const copyList: Class[][] = lists.listOfCourseLists.map(courseList=> [...courseList]);
                copyList[semesterCnt-1] = copyList[semesterCnt-1].filter(courses => courses.id != course.id);
                lists.setlistOfCourseLists(copyList);
                break;
            }
        }
    }

    function removeTechElectives(){
        for(let i = 0; i < lists.listOfTechElectives[semesterCnt-1].length; i++){
            if(lists.listOfTechElectives[semesterCnt-1][i].id === course.id && credits.techElectiveCredits !== 0){
                credits.setTechElectiveCredits(credits.techElectiveCredits-lists.listOfTechElectives[semesterCnt-1][i].credits);
                const copyTechList: Class[][] = lists.listOfTechElectives.map(techList=> [...techList]);
                copyTechList[semesterCnt-1] = copyTechList[semesterCnt-1].filter(techcourses => techcourses.id != course.id);
                lists.setlistOfCourseLists(copyTechList);
                break;
            }
        }
    }

    function removeFocusClasses(){
        for(let i = 0; i < lists.listOfFocusClasses[semesterCnt-1].length; i++){
            if(lists.listOfFocusClasses[semesterCnt-1][i].id === course.id && credits.focusAreaCredits !== 0){
                credits.setFocusAreaCredits(credits.focusAreaCredits-lists.listOfFocusClasses[semesterCnt-1][i].credits);
                const copyFocusList: Class[][] = lists.listOfFocusClasses.map(focusList=> [...focusList]);
                copyFocusList[semesterCnt-1] = copyFocusList[semesterCnt-1].filter(focuscourses => focuscourses.id != course.id);
                lists.setlistOfCourseLists(copyFocusList);
                break;
            }
        }
    }

    return (
        <Row>
            <Col>
                <button className="removeCourse" aria-label="remove-course" onClick={removeCourse} margin-top={"0.2em"} margin-bottom="0.2em">
                    <img src={x} alt="Remove Course Button"/>
                </button>
            </Col>
            <Col data-testid="course-id">{course.id}</Col>
            <Col>{course.name}</Col>
            <Col>{course.credits}</Col>
            <Col><button onClick={editCourse}>Edit</button></Col>
            <EditCourseModal ogClass={course} currClasses={currCourses} setCurrCourse={setCurrCourses} visible={visible} setVisible={setVisible} lists={lists} semesterCnt={semesterCnt} credits={credits}></EditCourseModal>
        </Row>

            
    );
}

export default Course;