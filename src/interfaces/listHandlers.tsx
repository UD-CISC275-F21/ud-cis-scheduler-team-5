import { Class } from "./course";

export interface listHandlers {
    listOfCourseLists: Class[][];
    setlistOfCourseLists: (c: Class[][])=>void;
    listOfTechElectives: Class[][];
    setListOfTechElectives: (t: Class[][])=>void;
    listOfFocusClasses: Class[][];
    setListOfFocusClasses: (f: Class[][])=>void;
}