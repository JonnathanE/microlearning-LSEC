# Microlearning LSEC

The following project is a web application dedicated to teaching Ecuadorian sign language through microlearning.

The project is built in React. The API are below:

- API: https://github.com/JonnathanE/api-microlearning-LSEC
- DEMO: https://learn-lsec.herokuapp.com/

## Screenshot

![FireShot Capture 016 - LSEC App - react-web-jede herokuapp com](https://user-images.githubusercontent.com/33469147/184988559-4c83d403-7fc6-4ccb-974b-2333bca5ff79.png)

![image](https://user-images.githubusercontent.com/33469147/184989020-80b9cb5c-4f47-4453-a26f-dbb858644e79.png)

![image](https://user-images.githubusercontent.com/33469147/184989122-dff64906-d2dc-45f7-8409-163aac31c627.png)



## Tech Stack

**Client:** React, Vite, Tailwind

**Server:** Node, Express, MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`VITE_API_URL` = (the backend server url: serverURL/api). Copy `.env.example` to `.env`.

Vite embeds this value at build time.
    

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
  pnpm install
```

Start the development server

```bash
  pnpm dev
```
  


## Available Scripts

In the project directory, you can run:

### `pnpm dev`

Runs the app in development mode with Vite.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm test`

Runs Vitest in watch mode. `pnpm test:run` runs the suite once.

### `pnpm build`

Builds the app for production into the `dist` folder.

### `pnpm preview`

Serves the production build locally on port 3000.

### `pnpm cypress:open`

Open Cypress to perform e2e testing. To do this you must run `pnpm dev`.
