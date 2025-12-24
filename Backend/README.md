Micro-CRM Backend

``This is the backend for the Micro-CRM application.``

``It is built using Node.js, TypeScript, Express, Sequelize, and PostgreSQL.``

``Requirements``

Node.js(v18+)

npm

PostgreSQL

``Setup``

1. Install dependencies
npm install

2. Environment variables

Create a .env file using the example:

cp .env.example .env


``Update the values as needed:``

PORT=3001
DATABASE_URL=postgres://<user>:<password>@localhost:5432/micro_crm
JWT_SECRET=your_secret_key
NODE_ENV=development


``Make sure the database exists before running migrations.``

3. Database setup

``Run migrations:``

npx sequelize-cli db:migrate


``Run seed data:``

npx sequelize-cli db:seed:all

Run the server
npm run dev


The server will start on port 3001.

``Features``

* User authentication using JWT

* Basic role-based access (admin / member)

* Multi-organization support

* CRUD APIs for contacts

``Tests``

``Tests are located in the following directory:``

src/tests/

``Test coverage includes:``

* Authentication (login success / failure)

* Tenant isolation (organizations cannot access each other’s data)

* contacts CRUD (create, read, update, delete)

Run tests
npm test


``Tests are implemented using:``

Jest

Supertest
