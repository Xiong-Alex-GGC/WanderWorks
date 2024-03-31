import { getDocs, collection } from 'firebase/firestore';
import { getAllActivities } from '../models/activityModel';
import {isActivityOverlapping} from '../models/activityModel';


test('getAllActivities', async () => {
    const data = await getAllActivities();
    expect(data).toEqual([]);
}, 30000);
   

test('isActivityOverlapping', () => {
    const existingActivities = [
        {
            id: 1,
            date: '2022-12-12T00:00:00',
            startTime: 600,
            endTime: 1200
        },
        {
            id: 2,
            date: '2022-12-12T00:00:00',
            startTime: 1300,
            endTime: 1400
        }
    ];
    const newActivity = {
        id: 3,
        date: '2022-12-12T00:00:00',
        startTime: 1100,
        endTime: 1500
    };
    const result = isActivityOverlapping(existingActivities, newActivity);
    expect(result).toBe(true);
}, 30000);



