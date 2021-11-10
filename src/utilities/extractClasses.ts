//import classes from "../assets/classes.json";
import courseData from "../assets/courseData.json";
import { Class } from "../interfaces/course";
import {rawClass} from "../interfaces/rawcourse";

let courseMap:Record<string, Class[]> = {};
courseData.map((course:rawClass) => {
    const dept = course.courseID.slice(0,4);
    if(!(dept in courseMap)){
        courseMap[dept] = [];
    }
    const rawCourseId = course.courseID.split(" ");
    const courseId = rawCourseId[0] + rawCourseId[1];
    const newCourse:Class = { id:courseId, name:course.title.substr(11), credits:parseInt(course.credits), 
        description:course.description, prereqs:course.prereqs };
    courseMap[dept].push(newCourse);
});

const courseDepts:string[] = Object.keys(courseMap);
courseDepts.sort();

const newCourseMap:Record<string, Class[]> ={};
courseDepts.forEach(function(dept){
    newCourseMap[dept] = courseMap[dept].sort((a:Class, b:Class) :number => {
        if(a.id > b.id){
            return 1;
        }else if(a.id < b.id){
            return -1;
        }else{
            return 0;
        }
    });
});

courseMap = newCourseMap;
export {courseMap};