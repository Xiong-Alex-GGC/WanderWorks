import { getDocs, collection } from 'firebase/firestore';
import { getAllActivities } from '../models/activityModel';
import {isActivityOverlapping} from '../models/activityModel';


test('getAllActivities', async () => {
    const data = await getAllActivities();
    expect(data).toEqual([]);
}, 30000);
   




