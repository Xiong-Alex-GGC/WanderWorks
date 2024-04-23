import { getAllExpenses } from "../models/expenseModel";

test ('getAllExpenses', async () => {
    const data = await getAllExpenses();
    expect(data).toEqual([]);
}, 30000);