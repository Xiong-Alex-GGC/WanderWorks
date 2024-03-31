import { getUserItineraries } from "../models/itineraryModel";

test('getUserItineraries', async () => {
    const data = await getUserItineraries('testUser');
    expect(data).toEqual([]);
}, 30000);