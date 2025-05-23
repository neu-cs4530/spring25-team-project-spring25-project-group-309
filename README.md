[[Final Report]](https://docs.google.com/document/d/1W-3TLooBGI3vS3qcvTvsoxrtkUL_iG2LdudOZcJzQxk/edit?tab=t.0)

To access NU Board on the deployed site:

1. Go to https://cs4530-s25-309.onrender.com/
2. Log In or Sign Up and click the ‘Project Planning’ tab on the sidebar navigation. Sprint Planning, Kanban Board, and Task Roadmap are the three pages where our features are implemented

Please note that the server is running on a free instance of Render, so it takes about 40-50 seconds for the server to wake up from inactivity.

## Getting Started

1. Download the zip file or clone our repository locally. The repository is located at: https://github.com/neu-cs4530/spring25-team-project-spring25-project-group-309
2. Make sure you have Node.js, npm, and MongoDB installed on your machine
3. The three main directories involved with our project are client, server, and testing. Install all of the dependencies for the project by running `cd <directory>`, and `npm install` in each of the three directories
4. Setup environment variables for the client directory in the file `/.client/.env` with `REACT_APP_SERVER_URL=http://localhost:8000`
5. Setup environment variables for the server directory in the file `/.server/.env` with
`MONGODB_URI=mongodb+srv://aayusht2003:rdx770UaElvcOUcC@db-cs4530-spring25-309.bmv9x.mongodb.net`
`CLIENT_URL=http://localhost:3000`
`PORT=8000`
6. To see the database in MongoDB compass, create a new connection and paste in: `mongodb+srv://aayusht2003:rdx770UaElvcOUcC@db-cs4530-spring25-309.bmv9x.mongodb.net/` in the URI
7. To get data for the rest of the application outside of NU Board features, run `npm run populate-db` in the server directory
8. To run our automated unit tests and see test coverage statistics, run `cd server` and `npm test`
9. To start the server locally, run `cd server` and `npm start`
10. To start the client locally, run `cd client` and `npm start`
11. Log In or Sign Up and click the ‘Project Planning’ tab on the sidebar navigation. Sprint Planning, Kanban Board, and Task Roadmap are the three pages where our features are implemented


## Codebase Folder Structure

- `client`: Contains the frontend application code, responsible for the user interface and interacting with the backend. This directory includes all React components and related assets.
- `server`: Contains the backend application code, handling the logic, APIs, and database interactions. It serves requests from the client and processes data accordingly.
- `shared`: Contains all shared type definitions that are used by both the client and server. This helps maintain consistency and reduces duplication of code between the two folders. The type definitions are imported and shared within each folder's `types/types.ts` file.

## Database Architecture

The schemas for the database are documented in the directory `server/models/schema`.
A class diagram for the schema definition is shown below:

![Class Diagram](nuboard_schema.jpg)

