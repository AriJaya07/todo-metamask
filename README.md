# Todo App with Next.js, MySQL, Prisma, and MetaMask

Live Preview [TodoLink]([https://pages.github.com/](https://todo-meta.onrender.com)).

### Table of Contents

- Description
- Prerequisites
- Getting Started
  1. Step 1: Set Up Next.js Project
  2. Step 2: Set Up Prisma with MySQL
  3. Step 3: Implement MetaMask Authentication
  4. Step 4: Build the Todo App
  5. Step 5: Deploy the App
- Scripts
- Technologies Used
- Contributing
- License

### Description

This repository provides a step-by-step guide and source code for building a simple Todo application using Next.js for the frontend, MySQL with Prisma for the database, and MetaMask for Ethereum-based authentication. The app allows users to manage their tasks securely by leveraging blockchain technology for authentication.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js (>= 14.x)
MySQL (>= 5.7)
MetaMask extension in your browser
An Ethereum wallet for testing purposes
Getting Started

Follow the steps below to set up and run the project locally.

### Step 1: Set Up Next.js Project
Initialize the Project
Use the Next.js CLI to create a new project:
```
npx create-next-app todo-app
cd todo-app
npm install @prisma/client prisma ethers
npm install -D typescript
```


Step 2: Set Up Prisma with MySQL
Initialize Prisma
Initialize Prisma in your project:

bash
Salin kode
```
npx prisma init
```
This will create a prisma directory with a schema.prisma file and a .env file.
Configure Prisma
Update the prisma/schema.prisma file with your MySQL connection details and define the Todo model:

Set Up MySQL Database
Create a .env file in the root of your project and add your MySQL connection string:

.env
Salin kode
DATABASE_URL="mysql://user:password@localhost:3306/todo-db"

bash
Salin kode
```
npx prisma migrate dev --name init
```
This command will generate the necessary SQL and apply it to your database.

###  Step 3: Implement MetaMask Authentication
Install ethers.js
Ensure ethers.js is installed (if not done earlier):
```
npm install ethers
```

### Create MetaMask Authentication Hook
Create a custom hook to handle MetaMask authentication. Create a file named useMetaMask.ts in the src/hooks directory:

### Create API Routes for Todos
### Create API endpoints to handle CRUD operations for todos.

### GET and POST Todos
Create a file named todos.ts in the pages/api directory:

Integrate MetaMask in the App
Ensure that users must authenticate via MetaMask before accessing the Todo list. This was partially handled in the Home component earlier. You can further enhance security by associating todos with user accounts.

For simplicity, this guide assumes a single-user setup. For multi-user, you'd need to associate todos with the authenticated Ethereum address.
Step 5: Deploy the App
Deploy your application to a hosting platform such as Vercel or Netlify. Here's a brief overview using Vercel:

### Push Your Code to GitHub
Initialize a Git repository, commit your code, and push it to GitHub:

```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/todo-app.git
git push -u origin mai
```

Here are some useful scripts for development and deployment:

### Run the development server

```
npm run dev
```

### Build the application for production
```
npm run build
```

### Start the production server
```
npm start
```


### Generate Prisma client
```
npx prisma generate
```

### Run Prisma migrations
```
npx prisma migrate dev --name <migration-name>
```

Technologies Used

Next.js - React framework for server-side rendering
MySQL - Relational database management system
Prisma - Next-generation ORM
MetaMask - Ethereum wallet for authentication
Ethers.js - Ethereum JavaScript library
Vercel - Cloud platform for static sites and Serverless Functions
Contributing

Contributions are welcome! Please follow these steps:

Fork the repository
Create a new branch for your feature or bugfix:
bash
Salin kode
```
git checkout -b feature/your-feature-name
```

Commit your changes:
```
git commit -m "Add your message"
```

Push to the branch:
```
git push origin feature/your-feature-name
```

Open a pull request describing your changes.
License

This project is licensed under the MIT License.

Additional Notes

Environment Variables: Ensure that sensitive information like DATABASE_URL is not exposed publicly. Use environment variables to manage such data securely.
Security: For production applications, consider implementing more robust authentication and authorization mechanisms, especially when dealing with blockchain integrations.
Enhancements: You can extend this application by adding features like user-specific todos, task deadlines, priorities, and more.
Feel free to customize this README.md further based on the specific details and features of your project. Including screenshots, gifs, or diagrams can also help users better understand your application.
