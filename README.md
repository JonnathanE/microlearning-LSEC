# Microlearning LSEC

The following project is a web application dedicated to teaching Ecuadorian sign language through microlearning.

The project is built in React. The API are below:

- API: https://github.com/JonnathanE/api-microlearning-LSEC
- DEMO: https://learn-lsec.herokuapp.com/

## Screenshot

![image](https://user-images.githubusercontent.com/33469147/161625727-aa1aa1f6-bf4d-4935-b10d-2eba05ff4e7e.png)

![image](https://user-images.githubusercontent.com/33469147/161625229-0e731c33-b51c-4515-a691-e3b0e5cf20bf.png)

![image](https://user-images.githubusercontent.com/33469147/161625112-8b5c74e3-43a3-40a5-92b7-5fa56faf0a31.png)


## Tech Stack

**Client:** React, Bootstrap 4

**Server:** Node, Express, MongoDb


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_URL` = =(the backend server url: serverURL/api)
    

## Run Locally

Clone the project

```bash
  git clone https://github.com/JonnathanE/microlearning-LSEC.git
```

Go to the project directory

```bash
  cd microlearning-LSEC
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
  


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.