import React from "react";
import "../App.css";
import { Button, Table } from "react-bootstrap";
import { Class } from "../interfaces/course";
import { sem } from "../interfaces/sem";
import { creditsHandlers } from "../interfaces/creditsHandlers";
import { listHandlers } from "../interfaces/listHandlers";
import Course from "./Course";
import { EditSemesterModal } from "./EditSemesterModal";
import { AddCourseModal } from "./AddCourseModal";



export function Semester({semester, lists, semesterCnt, credits}: 
    {semester: sem, lists: listHandlers, semesterCnt: number, credits: creditsHandlers}): JSX.Element {
  
    const [addCourseVisible, setAddCourseVisible] = React.useState<boolean>(false);
    const [classYear,setClassYear] = React.useState<string>("____ Year");
    const [season,setSeason] = React.useState<string>("____ Semester");
    const [currClasses, setCurrClasses] = React.useState<Class[]>(semester.courses);
    const [visible, setVisible] = React.useState<boolean>(false);


    semester.courses = currClasses;
    //console.log(semester.courses);

    function editCard() {
        setVisible(true);
    }

    function addCourse() : void {
        setAddCourseVisible(true);
    }

    return (
        <div>
            <div className="semester-title" data-testid="sem-title">
                <strong>{classYear}: {season} <button onClick={editCard}>Edit Semester</button></strong>
                <EditSemesterModal classYear={classYear} season={season} setClassYear={setClassYear} setSeason = {setSeason} visible={visible} setVisible={setVisible}></EditSemesterModal>
            </div>
            <Table striped bordered size="sm">
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
                            <Course key = {c.id} course={c} currCourses={currClasses} setCurrCourses={setCurrClasses} listOfCourseLists={listOfCourseLists} setlistOfCourseLists={setlistOfCourseLists} semesterCnt={semesterCnt}></Course>
                        );
                    })
                    }
                    <tr>
                        <td colSpan={5}><Button className="addCourse" data-testid="add-new-course" onClick={addCourse}>Add New Course</Button></td>
                    </tr>
                </tbody>
                <AddCourseModal currClasses={currClasses} visible={addCourseVisible} setVisible={setAddCourseVisible} setCurrCourse={setCurrClasses} listOfCourseLists={listOfCourseLists} setlistOfCourseLists={setlistOfCourseLists} semesterCnt={semesterCnt}></AddCourseModal>
            </Table>
        </div>
    );
        
    /*

    return <BootstrapCard className="border-dark">
        <Col>
            <div className="semester-title" data-testid="sem-title">
                <strong>{classYear}: {season} <button onClick={editCard}>Edit Semester</button></strong>
                <EditSemesterModal classYear={classYear} season={season} setClassYear={setClassYear} setSeason = {setSeason} visible={visible} setVisible={setVisible}></EditSemesterModal>
            </div>
            <Row>
                <Col><strong>Remove Course</strong></Col>
                <Col><strong>Course ID</strong></Col>
                <Col><strong>Course Name</strong></Col>
                <Col><strong>Credits</strong></Col>
                <Col><strong>Edit Course</strong></Col>
            </Row>

            {currClasses.map(c => {
                return (
                    <Row key = {c.id}>
                        <Course course={c} currCourses={currClasses} setCurrCourses={setCurrClasses} lists={lists} semesterCnt={semesterCnt} credits={credits}></Course>
                    </Row>
                );
            })
            }
            <p></p>
            <Button className="addCourse" data-testid="add-new-course" onClick={addCourse}>Add New Course</Button>
            <AddCourseModal currClasses={currClasses} visible={addCourseVisible} setVisible={setAddCourseVisible} setCurrCourse={setCurrClasses} lists={lists} semesterCnt={semesterCnt} credits={credits}></AddCourseModal>
        </Col>
    </BootstrapCard>;
    */
}

export default Semester;
