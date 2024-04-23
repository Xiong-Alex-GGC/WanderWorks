import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import ItineraryCard from "../components/Cards/ItineraryCard";

describe("ItineraryCard", () => {
    const itinerary = {
        // ... your itinerary object
    };

    it("renders itinerary card correctly", () => {
        const { getByText, getByAltText } = render(
            <MemoryRouter>
                <ItineraryCard {...itinerary} />
            </MemoryRouter>
        );

        // ... your assertions
    });
});
