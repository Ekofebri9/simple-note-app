<h1 align="center">Simple Note App RESTful API with ExpressJS</h1>

<p align="center">
  <a href="https://nodejs.org/">
    <img alt="restfulapi" title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

## Table of contents
* [Introduction](#introduction)
* [Requirements](#requirements)
* [How to run the app ?](#how-to-run-the-app-)
* [Set up .env file](#set-up-env-file)
* [End Point List](#end-point-list)

## Introduction
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

Here i was built the Simple Note App which specially for backend only.

Express.js, or simply Express, is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Requirements
1. node_modules
2. Postman
3. Web Server (ex. localhost)

## How to run the app ?
1. Open CMD or Terminal and enter to the app directory
2. Type `npm install`
3. Make a new file with name **.env** in the root directory, set up first [here](#set-up-env-file)
4. Turn on Web Server and database (for example :MySQL as database and xampp as web server) you can using Third-party tool.
5. Import file [task_week1.sql](task_week1.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/notes)
8. You can see all the end point [here](#end-point-list)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
NODE_ENV=development
PORT= // fill with your port

DB_HOST=localhost
DB_USER=root // default
DB_PASS= // default
DB_NAME=task_week1
```

## End Point List
**1. GET**
* `/note`
* `//note/:idNote` (Get notes by id)
* `/category`
* `/category/:idCategory` (Get category by id)
* `/notes?idCategory=` (Get notes by category id)
* `/notes?search=` (Search operation by title)
* `/notes?sort=` (Sort operation) // fill with asc or desc
* `/notes?page=` (Paging for limiting notes) // fill only with integer
**2. POST**
* `/note`
* `/category`

**3. PATCH**
* `/note/:idNote` (Update notes by id)
* `/category/:idCategory` (Update category by id)

**4. DELETE**
* `/notes/:idNote` (Delete notes by id)
* `/category/:idCategory` (Delete category by id)

<hr>

<h3 align="center">Author: Eko Febriyanto</h3>
