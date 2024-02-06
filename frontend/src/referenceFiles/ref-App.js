import './App.css';
import { Auth } from "./components/auth";
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'

import { db, auth } from './config/firebase';

function App() {

  const [itineraryList, setItineraryList] = useState([]);
  const itineraryCollectionRef = collection(db, "Itinerary")
  
  // New Itinerary States
  const [newItineraryName, setNewItineraryName] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  // Update ItineraryName State
  const [updatedItineraryName, setUpdatedItineraryName] = useState("");


  const getItineraryList = async () => {
    //Read Data
    //Set Data
    try {
      const data = await getDocs(itineraryCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setItineraryList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };


  const deleteItinerary = async (id) => {
    const itineraryDoc = doc(db, "Itinerary", id);
    await deleteDoc(itineraryDoc);
  };

  const updateItineraryName = async (id) => {
    const itineraryDoc = doc(db, "Itinerary", id);
    await updateDoc(itineraryDoc, {tripName: updatedItineraryName});
  };


  useEffect(() => {
    getItineraryList();
  }, []);

  const onSubmitItinerary = async () => {

    try {
      await addDoc(itineraryCollectionRef, {
        tripName: newItineraryName, 
        startDate: newStartDate, 
        endDate: newEndDate,
        userId: auth?.currentUser?.uid,
      });
    
      getItineraryList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />

      <div>
        <input placeholder="Trip name" 
        onChange={(e) => setNewItineraryName(e.target.value)}/>
        <input placeholder="Start Date" type='datetime-local' 
        onChange={(e) => setNewStartDate(e.target.value)}
        />
        <input placeholder="End Date" type='datetime-local' 
        onChange={(e) => setNewEndDate(e.target.value)}/>
        <button onClick={onSubmitItinerary}>Submit New Trip</button>



      </div>

      <div>
        {itineraryList.map((Itinerary) => (
          <div>
            <h1>{Itinerary.tripName}</h1>

            {/* <h2>{Itinerary.isFinsihed}</h2>
            <h2>{Itinerary.startDate}</h2>
            <h2>{Itinerary.endDate}</h2> */}

            <button onClick={() => deleteItinerary(Itinerary.id)}>Delete Itinerary</button>
            
            <input placeholder='Edit Name'
            onChange={(e) => setUpdatedItineraryName(e.target.value)}
            />
            <button onClick={() => updateItineraryName(Itinerary.id)}>Update Name</button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
