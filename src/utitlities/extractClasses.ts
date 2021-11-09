import classes from "../assets/classes.json";
import { Class } from "../interfaces/course";

const courseMap:Record<string, string[]> = {};
classes.map((course:Class) => {
    const dept = course.id.slice(0,4);
    if(!(dept in courseMap)){
        courseMap[dept] = [];
    }
    courseMap[dept].push(course.id);
});

export {courseMap};