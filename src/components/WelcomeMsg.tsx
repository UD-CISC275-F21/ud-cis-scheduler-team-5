import React, { useState } from "react";
import { Alert,Button } from "react-bootstrap";
import { DEFAULT_MIN_VERSION } from "tls";
import "../App.css";



function WelcomeMsg(): JSX.Element {
    const [displayWelcome, setDisplayWelcome] = useState(true);

    return (

        <Alert show={displayWelcome} className="Welcome container pt-5">
                
            <p><b>Hi, welcome to the UD Computer Science degree planner!</b></p>
            <p>Add desired courses and semesters</p>
                

            <hr/>

            <Button onClick={()=>setDisplayWelcome(false)}>
                    Close and start scheduling
            </Button>

        </Alert>

                
    );
}

export default WelcomeMsg;