import { Class } from "./course";

export interface listHandlers {
    listOfCourseLists: Class[][];
    setlistOfCourseLists: (c: Class[][])=>void;
}