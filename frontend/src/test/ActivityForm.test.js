import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import ActivityForm from "../components/Forms/ActivityForm";

describe("ActivityForm", () => {
    it("renders ActivityForm correctly", () => {
        render(
        <MemoryRouter>
            <ActivityForm />
        </MemoryRouter>
        );
    });
    }); 