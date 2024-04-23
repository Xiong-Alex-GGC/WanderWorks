import { getAllUsers } from "../models/userModel";

test ('getAllUsers', async () => {
    const data = await getAllUsers();
    expect(data).toEqual([]);
}, 30000);
