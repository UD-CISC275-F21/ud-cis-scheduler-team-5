import React from "react";
//import { Col, Row } from "react-bootstrap";
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
                continue;
            }else{
                newCourses = newCourses.concat(currCourses[index]);
            }
        }
        removelistOfCourseLists();
        setCurrCourses(newCourses);
    }

    function removelistOfCourseLists() { 
        for(let i = 0; i < lists.listOfCourseLists[semesterCnt-1].length; i++){
            if(lists.listOfCourseLists[semesterCnt-1][i].id === course.id) {
                credits.setGlobalCredits(credits.globalCredits - lists.listOfCourseLists[semesterCnt-1][i].credits);
                removeSpecialReqCredits(lists.listOfCourseLists[semesterCnt-1][i]);
                const copyList: Class[][] = lists.listOfCourseLists.map(courseList=> [...courseList]);
                copyList[semesterCnt-1] = copyList[semesterCnt-1].filter(courses => courses.id != course.id);
                lists.setlistOfCourseLists(copyList);
                break;
            }
        }
    }

    function removeSpecialReqCredits(course: Class){
        if(course.specreq == "Six additional credits of technical electives"){
            credits.setTechElectiveCredits(credits.techElectiveCredits-course.credits);
        } else if (course.specreq == "12 credits for an approved focus area"){
            credits.setFocusAreaCredits(credits.focusAreaCredits-course.credits);
        }
    }

    console.log(course);
    return (
        <tr>
            <td>
                <button className="removeCourse" aria-label="remove-course" onClick={removeCourse} margin-top={"0.2em"} margin-bottom="0.2em">
                    <img src={x} alt="Remove Course Button"/>
                </button>
            </td>
            <td data-testid="course-id">{course.id} {course.name}</td>
            {//<td>{course.name}</td>
            }
            <td>{course.credits}</td>
            <td><button onClick={editCourse}>Edit</button></td>
            <EditCourseModal ogClass={course} currClasses={currCourses} setCurrCourse={setCurrCourses} visible={visible} setVisible={setVisible} lists={lists} semesterCnt={semesterCnt} credits={credits}></EditCourseModal>
        </tr>
    );
}

export default Course;