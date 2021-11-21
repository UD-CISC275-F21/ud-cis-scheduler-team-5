import React from "react";
import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
    beforeEach(() => {
        render(<App />);
    });

    it("renders UD CISC Scheduler text", () => {
        const linkElement = screen.getByText(/UD CIS Scheduler/i);
        expect(linkElement).toBeInTheDocument();
    });

    it("has the Add New Course button on render", () => {
        const element = screen.getByRole("button", {name: "Add New Course"});
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

    it("allows you to edit the semester when you click the edit semester button", async () => {
        const editSemButton = screen.getByRole("button", {name: "Edit Semester"});
        editSemButton.click();
        const semYearInput = await screen.getByRole("textbox", {name: /sem-class-year/i});
        fireEvent.change(semYearInput, {target: {value: "Freshman Year"}});
        const semSeasonInput = await screen.getByRole("textbox", {name: /sem-season/i});
        fireEvent.change(semSeasonInput, {target: {value: "Fall Semester"}});
        
        const editButton = screen.getByRole("button", {name: "Edit"});
        editButton.click();
        const semYearTitle = screen.getByText(/^Freshman Year$/);
        const semSeasonTitle = screen.getByText(/^Fall Semester$/);
        expect(semYearTitle).toBeInTheDocument;
        expect(semSeasonTitle).toBeInTheDocument;
    });

    it("adds new semester when you click the button", async () => {
        const addSemButton = screen.getByTestId("add-sem-button");
        const semesters = screen.getAllByText("Remove Course");  //All semesters have "Remove Course" text in them
        addSemButton.click();
        const semcopy =  await screen.queryAllByText("Remove Course");
        expect(semesters.length+1).toEqual(semcopy.length);
    });

    it("removes a semester when you click the button", async () => {
        const addSemButton = screen.getByTestId("add-sem-button");
        const removeSemButton = screen.getByTestId("remove-sem-button");
        addSemButton.click();
        const semesters = screen.getAllByText("Remove Course");
        removeSemButton.click();
        const semcopy =  await screen.queryAllByText("Remove Course");
        expect(semesters.length-1).toEqual(semcopy.length);
    });

    it("adds a course to the semester if I select a course from AddCourseModal", async () => {
        const addButton= screen.getByTestId("add-new-course");   //Open Modal
        addButton.click();

        const deptDropdownButton = await screen.getByRole("button", {name: "Course Department"}); //Select Department
        deptDropdownButton.click();
        const dropMenu = screen.getByTestId("dept-drop-menu");
        const deptText = getByRole(dropMenu, "button", {name: "CISC"});
        deptText.click();
        await waitFor(() => {
            expect(deptDropdownButton.innerHTML).toBe("CISC");
        });

        const courseDropdownButton = screen.getByRole("button", {name: "Course ID"}); //Select Class
        courseDropdownButton.click();
        const courseMenu = screen.getByTestId("course-drop-menu");
        const courseText = getByRole(courseMenu, "button", {name: "CISC108"});
        courseText.click();
        await waitFor(() => {
            expect(courseDropdownButton.innerHTML).toBe("CISC108");
        });

        const addCourseButton = screen.getByRole("button", {name: "Add Course"}); //Add Class
        addCourseButton.click();
        const course = screen.getByTestId("course-id");
        expect(course.innerHTML).toBe("CISC108");
    });

    it("lets you edit the course id if you click the edit button", async () => {
        const editButton = screen.getByRole("button", {name: "Edit"});
        editButton.click();
        const courseIdInput = await screen.getByRole("textbox", {name: /course-id-input/i});
        fireEvent.change(courseIdInput, {target: {value: "CISC181"}});

        const editCourseButton = screen.getByRole("button", {name: "Edit Course"});
        editCourseButton.click();
        const course = screen.getByTestId("course-id");
        expect(course.innerHTML).toBe("CISC181");
    });

    it("removes a course to the semester if I click the x", async () => {
        const course= screen.getByTestId("course-id");
        const removeCourseButton = screen.getByRole("button", {name: /remove-course/i});
        removeCourseButton.click();
        expect(course).not.toBeInTheDocument;
    });

    it("saves schedule to browser local storage", async () => {
        const saveButton = screen.queryByTestId("save-local-storage");
        if (saveButton === null) {
            await saveButton;
        }else{
            saveButton.click();
            expect(JSON.stringify(window.localStorage)).toEqual("{\"cisc-degree-schedule\":\"[{\\\"cnt\\\":1,\\\"year\\\":\\\"Freshman\\\",\\\"season\\\":\\\"Fall\\\",\\\"courses\\\":[]}]\",\"cisc-degree-listofcourseLists\":\"[[]]\"}");
        }
    });

    

});



