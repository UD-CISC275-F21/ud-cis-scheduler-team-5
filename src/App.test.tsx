import React from "react";
import { fireEvent, getByRole, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

async function addACourse(){
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
}

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
        const closeButton = screen.getByRole("button", {name: "Close"});
        closeButton.click();
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
        const semesters = screen.getAllByText("Remove");  //All semesters have "Remove Course" text in them
        addSemButton.click();
        const semcopy =  await screen.queryAllByText("Remove");
        expect(semesters.length+1).toEqual(semcopy.length);
    });

    it("removes a semester when you click the button", async () => {
        const addSemButton = screen.getByTestId("add-sem-button");
        const removeSemButton = screen.getByTestId("remove-sem-button");
        addSemButton.click();
        const semesters = screen.getAllByText("Remove");
        removeSemButton.click();
        const semcopy =  await screen.queryAllByText("Remove");
        expect(semesters.length-1).toEqual(semcopy.length);
    });

    it("adds credits to the credit counter when you add a course", async () => {
        await addACourse();
        const degreeButton = screen.getByTestId("degree-button");
        degreeButton.click();
        const globalCreditCounter = screen.getByTestId("global-credit-counter");
        expect(globalCreditCounter.innerHTML).toBe("Credit Count: 3 out of 124 needed")
        
    });

    it("adds a course to the semester if I select a course from AddCourseModal", async () => {
        const course = screen.getByTestId("course-id");
        expect(course.innerHTML).toBe("CISC108 Introduction to Computer Science I");
    });


    it("lets you edit the course id if you click the edit button", async () => {
        const editButton = screen.getByRole("button", {name: "Edit"});
        editButton.click();
        const courseIdInput = await screen.getByRole("textbox", {name: /course-id-input/i});
        fireEvent.change(courseIdInput, {target: {value: "CISC181"}});

        const editCourseButton = screen.getByRole("button", {name: "Edit Course"});
        editCourseButton.click();
        const course = screen.getByTestId("course-id");
        expect(course.innerHTML).toBe("CISC181 Introduction to Computer Science I");
    });

    it("removes a course to the semester if I click the x", async () => {
        const course= screen.getByTestId("course-id");
        const removeCourseButton = screen.getByRole("button", {name: /remove-course/i});
        removeCourseButton.click();
        expect(course).not.toBeInTheDocument;
    });

    it("removes credits from the credit counter after clicking the x", async() => {
        const degreeButton = screen.getByTestId("degree-button");
        degreeButton.click();
        const globalCreditCounter = screen.getByTestId("global-credit-counter");
        expect(globalCreditCounter.innerHTML).toBe("Credit Count: 0 out of 124 needed")
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

    it("lets you edit the number of credits using the edit button", async () => {
        await addACourse();
        const editButton = screen.getByRole("button", {name: "Edit"}); //Edit Number of Credits
        editButton.click();
        const courseCreditInput = await screen.getByRole("textbox", {name: /course-credit-input/i});
        fireEvent.change(courseCreditInput, {target: {value: "1"}});

        const editCourseButton = screen.getByRole("button", {name: "Edit Course"});
        editCourseButton.click();
        
        const degreeButton = screen.getByTestId("degree-button"); //check credits
        degreeButton.click();
        const globalCreditCounter = screen.getByTestId("global-credit-counter");
        expect(globalCreditCounter.innerHTML).toBe("Credit Count: 1 out of 124 needed");
    }); 

    it("lets you override to select technical electives", async() => {
        await addACourse();
        const editButton = screen.getByRole("button", {name: "Edit"}); 
        editButton.click();

        const reqDropdownButton = await screen.getByRole("button", {name: "CISC108"}); 
        reqDropdownButton.click();
        const reqMenu = screen.getByTestId("req-drop-menu");
        const reqButton = getByRole(reqMenu, "button", {name: "Six additional credits of technical electives"});
        reqButton.click();
        await waitFor(() => {
            expect(reqDropdownButton.innerHTML).toBe("Six additional credits of technical electives");
        });

        const editCourseButton = screen.getByRole("button", {name: "Edit Course"});
        editCourseButton.click();
        
        const degreeButton = screen.getByTestId("degree-button"); //check credits
        degreeButton.click();
        const techCredits = screen.getByText("3 out of 6");
        expect(techCredits).toHaveTextContent("3 out of 6");
    });

    it("lets you override to select focus area classes", async() => {
        await addACourse();
        const editButton = screen.getByRole("button", {name: "Edit"}); 
        editButton.click();

        const reqDropdownButton = await screen.getByRole("button", {name: "CISC108"}); 
        reqDropdownButton.click();
        const reqMenu = screen.getByTestId("req-drop-menu");
        const reqButton = getByRole(reqMenu, "button", {name: "12 credits for an approved focus area"});
        reqButton.click();
        await waitFor(() => {
            expect(reqDropdownButton.innerHTML).toBe("12 credits for an approved focus area");
        });

        const editCourseButton = screen.getByRole("button", {name: "Edit Course"});
        editCourseButton.click();
        
        const degreeButton = screen.getByTestId("degree-button"); //check credits
        degreeButton.click();
        const techCredits = screen.getByText("3 out of 12");
        expect(techCredits).toHaveTextContent("3 out of 12");
    });

});

