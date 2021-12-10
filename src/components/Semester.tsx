import React from "react";
import "../App.css";
import { Button, Table } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { semester } from "../interfaces/semester";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { listHandlers } from "../interfaces/listHandlers";
import Course from "./Course";
import { EditSemesterModal } from "./EditSemesterModal";
import { AddCourseModal } from "./AddCourseModal";



export function Semester({semester, lists, semesterCnt, credits}: {semester: semester, lists: listHandlers, semesterCnt: number, credits: creditsHandlers}): JSX.Element {
  
    const [addCourseVisible, setAddCourseVisible] = React.useState<boolean>(false);
    const [classYear,setClassYear] = React.useState<string>(semester.year);
    const [season,setSeason] = React.useState<string>(semester.season);
    const [currClasses, setCurrClasses] = React.useState<Class[]>(semester.courses);
    const [visible, setVisible] = React.useState<boolean>(false);

    semester.courses = currClasses.map(c=>c);

    function editCard() {   // sets visiblity of the edit course modal.
        setVisible(true);
    }

    function addCourse() : void {   // sets visibility to the add course modal.
        setAddCourseVisible(true);
    }

    return (
        <div className="semesterCard">
            <div className="semester-title" data-testid="sem-title">
                <strong>{classYear}: {season} <button onClick={editCard}>Edit Semester</button></strong>
                <EditSemesterModal classYear={classYear} season={season} setClassYear={setClassYear} setSeason = {setSeason} visible={visible} setVisible={setVisible}></EditSemesterModal>
            </div>
            <Table  striped bordered size="sm">
                <thead>
                    <tr>
                        <th>Remove</th>
                        <th>Course</th>
                        {//<th>Course Name</th>
                        }
                        <th>Credits</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currClasses.map(c=> {
                        return (
                            <Course key = {c.id} course={c} currCourses={currClasses} setCurrCourses={setCurrClasses} lists={lists} semesterCnt={semesterCnt} credits={credits}></Course>
                        );
                    })
                    }
                    <tr>
                        <td colSpan={5}><Button className="addCourse" data-testid="add-new-course" onClick={addCourse}>Add New Course</Button></td>
                    </tr>
                </tbody>
                <AddCourseModal currClasses={currClasses} visible={addCourseVisible} setVisible={setAddCourseVisible} setCurrCourse={setCurrClasses} lists={lists} semesterCnt={semesterCnt} credits={credits}></AddCourseModal>
            </Table>
        </div>
    );
}

export default Semester;
