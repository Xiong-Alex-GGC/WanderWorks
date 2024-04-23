 import ProfileForm from '../components/Forms/ProfileForm.js';
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter

// Your code here

test('renders ProfileForm component', () => {
    render(
        <MemoryRouter>
            <ProfileForm />
        </MemoryRouter>
    );
    });