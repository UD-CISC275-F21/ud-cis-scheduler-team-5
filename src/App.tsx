import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Course from "./components/Course";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                UD CIS Scheduler
                Jarod Dagney was here.
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>Daniel Li was here</p>
                <p>Charles Adams was lost, but finally made it</p>
            </header>
            <table>
                <tr>
                    <Course id={"CISC275"} name={"Intro to Software Engineering"} description={"deez nuts"}></Course>
                    <Course id={"CISC106"} name={"Intro to Computer Science"} description={"ligma"}></Course>
                </tr>
                <tr>
                    <Course id={"PHYS207"} name={"Fundamentals of Physics"} description={"Probably the best course at UD"}></Course>
                </tr>
            </table>

        </div>
    );
}

export default App;
