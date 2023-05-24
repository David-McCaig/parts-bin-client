## PartsBin

PartsBin is an online marketplace for buying and selling new and used Mountain bikes and Mountain bike parts. The idea is to create an online community where anyone in Ontario can buy and sell Mountain bike gear easily.


=======
![Parts Bin](parts-bin.gif)


## Features
- Bikes and components section
- View and Add a new part or bike for sale with a photo 
- Fully responsive design for Mobile-Tablet-Desktop

**Future features**
- Register and log-in to create personal profile
- Private message system between users 

## Tech Stack

**Client:** 
HTML5,CSS3,SASS,Javascript,React,NodeJS

[![My Skills](https://skillicons.dev/icons?i=js,html,css,sass,react,nodejs,)](https://skillicons.dev)

**Server:**
NodeJS, Express, MySQL, knex
[![My Skills](https://skillicons.dev/icons?i=nodejs,express,mysql)](https://skillicons.dev)
## Run Locally

Clone the project

```bash
  git clone git@github.com:David-McCaig/parts-bin.git
```

Go to the project directory

cd into client and cd into server folders, then install dependencies 

Install dependencies

```bash
  npm install 
```

In server side 
run migration and seed files to set up your database.

```bash
  npx knex migrate:latest 
  npx knex seed:run 
```
Start the server on the server side 

```bash
  npm run dev 
```
Start the server on the client side 

```bash
  npm run start
```
Now the app should be live! 
# parts-bin-client
