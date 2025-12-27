# Node.js + PostgreSQL Project

This is a simple Node.js project demonstrating CRUD operations with PostgreSQL.

## Features
- Connect to PostgreSQL database using `pg` library
- CRUD operations (Create, Read, Update, Delete)
- Environment variables configuration
- Prepared statements to prevent SQL injection

## Requirements
- Node.js >= 14
- PostgreSQL database
- npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yourproject.git
2.Navigate to project folder:

cd yourproject


3.Install dependencies:

npm install


4.Create a .env file in the root folder:

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=testdb
DB_PORT=5432
