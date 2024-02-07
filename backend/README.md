# Setup (in terminal wanderworks/backend):
npm install
nodemon app.js

console should display starting node app.js / firebase connection successful / Up & running

testing API setup:
on vsc, navigate to extensions and install/open thunder client

From there you can test the api.

# Example 1:
-------Choose the resonsse type to get, type in url, click send. Retrieve list of users

| GET | localhost:4000/api/users | Send |

# Example 2:
-------Choose response type to Poset, type in url, click Body, change body type to JSON, type in Json data for the user, click Send. Creates new User

| Post | localhost:4000/api/create-user | Send |
--------------------------- Body ---------------
Json -------------------------------------------
_______________________________________________
{
    "userId": "DYxmihEFGOBI2ZqFe2ia",
    "username": "Heiliger_Fleischzerkleinerer",
    "email": "Bob@gmail.com",
    "itineraryList": [
        19233,
        1234932,
        129340
    ]
}

Hopefully some of this makes sense