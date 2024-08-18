# Abstract | Help Center

## Project Description

The Help Center API is a RESTful API built with Node.js and Express.js. It allows users to manage "Help Center" cards, which represent different sections of a help center, such as "Branches," "Manage Your Account," "Manage Billing," etc. The API supports creating and retrieving these cards.

[Live Link](https://abstract-help.web.app/)<br/>
[Live server Link](https://abstractserver.vercel.app/)

## Features

- **Create a Card:** Add a new card to the help center.
- **Get All Cards:** Retrieve all cards in the help center.
- **Get a Specific Card:** Retrieve details of a specific card by its title.
- **Delete a Specific Card:** Retrieve details of a specific card by its title.
- **Get a Request :** Retrieve details of a specific request by its title.
- **Delete a Specific request:** Retrieve details of a specific request by its title.

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [MongoDB](https://www.mongodb.com/) (or a MongoDB Atlas account)

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/joychandrauday/abstract-project-assignment
   cd frontend
   ```
2. **Install Dependencies::**
   ```bash
   npm install
   ```
3. **Set Up Environment Variables(firebase and mongodb):**
   frontend environment variables (firebase)

   ```bash
   VITE_apiKey=
   VITE_authDomain=
   VITE_projectId=
   VITE_storageBucket=
   VITE_messagingSenderId=
   VITE_appId=
   VITE_API_URL=https://abstractserver.vercel.app
   ```

   backend environment variables

   ```bash
   PORT=8000
   DB_USER=yourMongoDBUser
   DB_PASS=yourMongoDBPassword
   ACCESS_TOKEN_SECRET=yourSecretKey
   or use
   VITE_API_URL=https://abstractserver.vercel.app
   ```

4. **Start server:**
   ```bash
      npm run dev
   ```

## API Endpoints

### Get All Cards

- **Endpoint:** `GET /cards`
- **Description:** Retrieves a list of all cards.
- **Response:**
  ```json
  [
    {
      "id": "12345",
      "title": "Branches",
      "description": "Abstract Branches lets you manage, version, and document your designs in one place."
    }
  ]
  ```

### Get a Specific Card

- **Endpoint:** `GET /cards/:title`
- **Description:** Retrieves the details of a specific card by its title.
- **Response:**
  ```json
  {
    "id": "12345",
    "title": "Branches",
    "description": "Abstract Branches lets you manage, version, and document your designs in one place."
  }
  ```

### Delete a Specific Card

- **Endpoint:** `DELETE /cards/:id`
- **Description:** Removes a specific card by its ID.
- **Response:**
  ```json
  {
    "message": "Card successfully deleted"
  }
  ```

### Get all Requests

- **Endpoint:** `GET /requests  retribes all requests.
- **Response:**
  ```json
  {
    "id": "request123",
    "title": "Request Title",
    "description": "Details of the specific request.",
    "status": "pending",
    "createdAt": "2024-08-19T12:34:56Z"
  }
  ```
### Update a Request

- **Endpoint:** `PATCH /requests/:id`
- **Description:** Updates the details of a specific request by its ID.
- **Request Body:**
  ```json
  {
    "title": "Updated Request Title",
    "description": "Updated details of the specific request.",
    "status": "approved"
  }

## Contact

For questions or enquiries, please contact [joychandraud@gmail.com](mailto:joychandraud@gmail.com).
For more [joychandrauday.web.app](https://joychandrauday.web.app/).
