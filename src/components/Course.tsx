import React from "react";

function Course({id, name, description} : {id:string, name:string, description:string}): JSX.Element {
    return (
        <p>This is a Course</p>
    );
}

export default Course;