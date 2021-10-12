import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                UD CIS Scheduler
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>Daniel Li was here</p>
                <p>Charles Adams was lost, but finally made it</p>
            </header>
        </div>
    );
}

export default App;
