import React from "react";

function Course({id, name, description} : {id:string, name:string, description:string}): JSX.Element {

    return (
        <td>
            {id}, {name},  {description}
            <button>Hello</button>
        </td>
    );
}

export default Course;