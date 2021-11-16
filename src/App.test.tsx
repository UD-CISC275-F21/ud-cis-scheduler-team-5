import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
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
});
