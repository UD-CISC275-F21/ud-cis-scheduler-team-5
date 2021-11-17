import React from "react";
import { render, screen } from "@testing-library/react";
import App, { LOCAL_STORAGE_LISTOFCOURSELISTS } from "./App";
import { AddCourseModal } from './components/AddCourseModal';
import { Class } from "./interfaces/course";

/*
test("renders UD CIS Scheduler text", () => {
    render(<App />);
    const linkElement = screen.getByText(/UD CIS Scheduler/i);
    expect(linkElement).toBeInTheDocument();
});
*/

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("renders UD CISC Scheduler text", () => {
        const linkElement = screen.getByText(/UD CIS Scheduler/i);
        expect(linkElement).toBeInTheDocument();
    });

    it("has the Add New Course button on render", () => {
        const element = screen.queryByTestId("addCourse");
        expect(element).toBeInTheDocument();
    });

    it("renders Add Course Modal on click", async () => {
        const button = screen.queryByTestId("addCourse");
        if(button !== null){
            button.click();
            const element = await screen.queryByTestId("DeptSearch");
            expect(element).toBeInTheDocument();
        }

    });

    it("shows degree requirements when you click the button", async () => {
        const degreeButton = screen.getByTestId("degree-button");
        degreeButton.click();
        const element = screen.getByTestId("degreeReqs");
        expect(element).toBeInTheDocument();
    });

    it("adds new semester when you click the button", async () => {
        const addSemButton = screen.getByTestId("add-sem-button");
        const semesters = screen.getAllByText("Remove Course");
        addSemButton.click();
        const semcopy =  await screen.queryAllByText("Remove Course");
        expect(semesters.length+1).toEqual(semcopy.length);
    });

    it("adds new semester when you click the button", async () => {
        const addSemButton = screen.getByTestId("add-sem-button");
        const removeSemButton = screen.getByTestId("remove-sem-button");
        addSemButton.click();
        const semesters = screen.getAllByText("Remove Course");
        removeSemButton.click();
        const semcopy =  await screen.queryAllByText("Remove Course");
        expect(semesters.length-1).toEqual(semcopy.length);
    });

});



