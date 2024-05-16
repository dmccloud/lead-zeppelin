## Lead Zeppelin

## Introduction

This is a full stack, Next.JS project that allows users to manage their sales leads. There is an intuitive UI that allows users to add, update, and delete leads. There are also api endpoints that allow users to interact with the leads data.

A deployed version can be found [here](https://lead-zeppelin.vercel.app/)

github repo is located [here](https://github.com/dmccloud/lead-zeppelin)

## Technologies

- React
- Next.js
- Typesctipt
- Postgres
- Drizzle
- Server Components and Server Actions

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Make sure you have a postgres database running
4. Create a `.env` file in the root directory and add the following environment variables:

```
POSTGRES_URL=postgres://username:password@localhost:5432/lead_zeppelin
```

5. Run `npm run db:push` to create the database tables
6. Create a Clerk project and obtain your public and private keys, add thes to the `.env` file:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk_public_key
CLERK_SECRET_KEY=clerk_secret_key
```

7. Run `npm run dev` to start the development server

## API Endpoints

- GET /api/leads
  -- ?getAll=true to get all leads
  `curl http://localhost:3000/api/leads?getAll=true`
  -- ?getById=id to get a lead by id
  `curl http://localhost:3000/api/leads?getById=1`
  -- ?getByOwnerId=OwnerId to get leads by owner
  ` curl http://localhost:3000/api/leads?getByOwnerId=user_qwuhdfwnwei2323runs`
- POST /api/leads
  `curl -X POST http://localhost:3000/api/leads -d '{"name": "John Doe", "email": "test@test.com", status: "new", owner: "user_qwuhdfwnwei2323runs"}' -H "Content-Type: application/json"`

- PATCH /api/leads/:id
  `curl -X PATCH http://localhost:3000/api/leads?id=1 -d '{"name": "John Doe", "email": "test@test2.com", "status":"Old"}' -H "Content-Type: application/json"`
- DELETE /api/leads/:id
  `curl -X DELETE http://localhost:3000/api/leads?id=1`
