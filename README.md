# Identity Reconciliation API

## Overview
This project provides an API to manage contact identity reconciliation. The API ensures that contacts with the same email and phone number are linked together while maintaining a primary and secondary contact structure.

## Features
- Create new contacts with email and phone number.
- Detect existing contacts and prevent duplicate entries.
- Maintain a primary contact and link secondary contacts.
- Return structured responses with linked contacts.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Akshai-M/identity-reconciliation
   cd identity-reconciliation
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up MongoDB:
   - Ensure MongoDB is running locally or use MongoDB Atlas.
   - Update `MONGO_URI` and `PORT` in the environment configuration if necessary.
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
### Create or Retrieve Contact
**Endpoint:** `POST /api/contacts`

**Request Body:**
```json
{
  "email": "example@example.com",
  "phoneNumber": "1234567890"
}
```

**Response Example:**
```json
{
  "primaryContactId": "60c72b2f9b1d4e3a8c8d1234",
  "emails": ["example@example.com"],
  "phoneNumbers": ["1234567890"],
  "secondaryContactIds": []
}
```

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose

## Troubleshooting
- Ensure MongoDB is running before starting the server.
- Check `.env` file for the correct `MONGO_URI` `PORT`.

## Recording
You can find the project demonstration video [here](https://www.dropbox.com/scl/fi/p7jw3as1m7q0terld8sas/identity-reconciliation.mp4?rlkey=ezzhcjwsc2zxl9024ybxoq782&st=g4yrvada&dl=0).

