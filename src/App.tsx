import React from "react";
import "./App.css";
import Semester from "./components/Semester";
import WelcomeMsg from "./components/WelcomeMsg";

function App(): JSX.Element {
    return (
        <div className="App">
            <WelcomeMsg></WelcomeMsg>
            <div>UD CIS Scheduler</div>
            <Semester></Semester>
        </div>
    );
}

export default App;
