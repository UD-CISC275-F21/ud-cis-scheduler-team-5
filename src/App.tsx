import React from "react";
import "./App.css";
import Semester from "./components/Semester";

function App(): JSX.Element {
    return (
        <div className="App">
            <div>UD CIS Scheduler</div>
            <Semester></Semester>
        </div>
    );
}

export default App;
