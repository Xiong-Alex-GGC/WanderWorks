# WanderWorks Repository

Welcome to the WanderWorks project repository! This is where our team collaborates on the development of an exciting project that combines innovative technology with a passion for exploration.

## Project Description

WanderWorks is a web-application that aims to revolutionize the way people plan and experience their travels. Our goal is to provide users with a seamless platform that enhances their travel experiences, making it easier to capture magical memories.

## Repository Location

The codebase for WanderWorks is hosted on GitHub. You can access it at [WanderWorks GitHub Repository](https://github.com/Xiong-Alex-GGC/WanderWorks/).

## Progress Tracking Tool

We use [JIRA](https://jira.ggc.edu/projects/WAN/summary) as our primary progress tracking tool. JIRA helps us manage tasks, track progress, and ensure a smooth workflow throughout the development process.


## Communication

Our team communicates through Discord and Teams. Feel free to join our Discord server to engage in discussions, ask questions, and stay up-to-date with the latest project developments.

## Team Members

1. **Alex Xiong** 🐯
   - Role: Code Architecture

2. **Juston Portillo** 🐱
   - Role: Data Modeler

3. **Anh Thu Nguyen** 🐻
   - Role: UI/UX Designer

4. **Andrew Nosa** 🐺
   - Role: Documentation Lead & Team Manager
  
5. **Augustine Ajua** 🐹
   - Role: Testing Lead
  
## About WanderWorks

> A website for planning trips, creating itinerary, adding activities, routing on map and managing budget.

## Requirements

To operate WanderWorks, you will require a web browser with JavaScript enabled, which is the default setting for most browsers.

## Build Architecture
WanderWorks used FERN Stack technology to build website. Below are softwares you need to install
* [VSCode](https://code.visualstudio.com/) Framework
* [NodeJS](https://nodejs.org/en)
* [ReactBootStrap](https://react-bootstrap.netlify.app/) CSS/JS Library
* [FireBase](https://firebase.google.com/) Data Modeling

## Developer Installation
1. Clone the master branch of this repository
```
git clone https://github.com/Xiong-Alex-GGC/WanderWorks.git
```
2. Open back-end folder in VSCode window, open terminal
Make sure to install all resources
```
npm install
```
Run back-end (connected to data on Firebase)
```
nodemon app.js
```
If you're getting an error about script not being allowed, open powershell and run the command
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then go back toback-end and re-run
```
nodemon app.js
```

3. Open front-end folder in a separate VSCode window, open terminal
Make sure to install all resources
```
npm install
```
Run front-end to see the website
```
npm start
```

## License

This website is protected under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.html). You are free to utilize it, on the condition that any alterations you make to it are accessible for others to use and modify in a similar way.

