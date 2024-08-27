Todo App with Next.js, MySQL, Prisma, and MetaMask

Live Preview

Table of Contents

Description
Prerequisites
Getting Started
Step 1: Set Up Next.js Project
Step 2: Set Up Prisma with MySQL
Step 3: Implement MetaMask Authentication
Step 4: Build the Todo App
Step 5: Deploy the App
Scripts
Technologies Used
Contributing
License
Description

This repository provides a step-by-step guide and source code for building a simple Todo application using Next.js for the frontend, MySQL with Prisma for the database, and MetaMask for Ethereum-based authentication. The app allows users to manage their tasks securely by leveraging blockchain technology for authentication.

Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js (>= 14.x)
MySQL (>= 5.7)
MetaMask extension in your browser
An Ethereum wallet for testing purposes
Getting Started

Follow the steps below to set up and run the project locally.

Step 1: Set Up Next.js Project
Initialize the Project
Use the Next.js CLI to create a new project:

bash
Salin kode
npx create-next-app todo-app
cd todo-app
Install Dependencies
Install the necessary packages for Prisma and Ethereum interactions:

bash
Salin kode
npm install @prisma/client prisma ethers
npm install -D typescript
Set Up TypeScript
Convert your project to TypeScript by adding a tsconfig.json file:

json
Salin kode
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
Next.js will automatically detect TypeScript and create additional configuration files upon running.
Step 2: Set Up Prisma with MySQL
Initialize Prisma
Initialize Prisma in your project:

bash
Salin kode
npx prisma init
This will create a prisma directory with a schema.prisma file and a .env file.
Configure Prisma
Update the prisma/schema.prisma file with your MySQL connection details and define the Todo model:

prisma
Salin kode
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
Set Up MySQL Database
Create a .env file in the root of your project and add your MySQL connection string:

env
Salin kode
DATABASE_URL="mysql://user:password@localhost:3306/todo-db"
Replace user, password, localhost, and 3306 with your MySQL credentials and host details.
Run Prisma Migrations
Apply the migration to create the Todo table in your database:

bash
Salin kode
npx prisma migrate dev --name init
This command will generate the necessary SQL and apply it to your database.
Step 3: Implement MetaMask Authentication
Install ethers.js
Ensure ethers.js is installed (if not done earlier):

bash
Salin kode
npm install ethers
Create MetaMask Authentication Hook
Create a custom hook to handle MetaMask authentication. Create a file named useMetaMask.ts in the src/hooks directory:

typescript
Salin kode
// src/hooks/useMetaMask.ts
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const useMetaMask = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      provider.send("eth_requestAccounts", [])
        .then((accounts: string[]) => {
          setAccount(accounts[0]);
        })
        .catch((err: any) => console.error(err));
    }
  }, []);

  return account;
};

export default useMetaMask;
Handle Authentication in the App
Use the useMetaMask hook in your main component to authenticate users:

typescript
Salin kode
// pages/index.tsx
import type { NextPage } from 'next';
import useMetaMask from '../hooks/useMetaMask';
import TodoList from '../components/TodoList';

const Home: NextPage = () => {
  const account = useMetaMask();

  if (!account) {
    return <div>Please connect your MetaMask wallet.</div>;
  }

  return (
    <div>
      <h2>Welcome, {account}</h2>
      <TodoList />
    </div>
  );
};

export default Home;
Step 4: Build the Todo App
Create Todo Components
Create a TodoList component to manage Todo items. Create a file named TodoList.tsx in the src/components directory:

typescript
Salin kode
// src/components/TodoList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      await axios.post('/api/todos', { title: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    try {
      await axios.put(`/api/todos/${id}`, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
Create API Routes for Todos
Create API endpoints to handle CRUD operations for todos.

GET and POST Todos
Create a file named todos.ts in the pages/api directory:

typescript
Salin kode
// pages/api/todos.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else if (req.method === 'POST') {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    try {
      const todo = await prisma.todo.create({
        data: { title },
      });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
PUT Todo (Update Completion Status)
Create a dynamic API route for updating a specific todo. Create a file named [id].ts in the pages/api/todos directory:

typescript
Salin kode
// pages/api/todos/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Completed status is required' });
    }
    try {
      const todo = await prisma.todo.update({
        where: { id: Number(id) },
        data: { completed },
      });
      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
Integrate MetaMask in the App
Ensure that users must authenticate via MetaMask before accessing the Todo list. This was partially handled in the Home component earlier. You can further enhance security by associating todos with user accounts.

For simplicity, this guide assumes a single-user setup. For multi-user, you'd need to associate todos with the authenticated Ethereum address.
Step 5: Deploy the App
Deploy your application to a hosting platform such as Vercel or Netlify. Here's a brief overview using Vercel:

Push Your Code to GitHub
Initialize a Git repository, commit your code, and push it to GitHub:

bash
Salin kode
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/todo-app.git
git push -u origin main
Connect to Vercel
Go to Vercel and sign up or log in.
Click on "New Project" and import your GitHub repository.
Follow the prompts to deploy. Vercel will automatically detect the Next.js framework.
Set Environment Variables
In your Vercel dashboard, go to your project settings and add the DATABASE_URL environment variable with your MySQL connection string.
Update Live Preview Link
After deployment, update the "Create Preview" button in your README.md with the live URL provided by Vercel.

markdown
Salin kode
[![Create Preview](https://img.shields.io/badge/preview-live-brightgreen)](https://your-vercel-app.vercel.app)
Scripts

Here are some useful scripts for development and deployment:

bash
Salin kode
# Run the development server
npm run dev

# Build the application for production
npm run build

# Start the production server
npm start

# Generate Prisma client
npx prisma generate

# Run Prisma migrations
npx prisma migrate dev --name <migration-name>
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
git checkout -b feature/your-feature-name
Commit your changes:
bash
Salin kode
git commit -m "Add your message"
Push to the branch:
bash
Salin kode
git push origin feature/your-feature-name
Open a pull request describing your changes.
License

This project is licensed under the MIT License.

Additional Notes

Environment Variables: Ensure that sensitive information like DATABASE_URL is not exposed publicly. Use environment variables to manage such data securely.
Security: For production applications, consider implementing more robust authentication and authorization mechanisms, especially when dealing with blockchain integrations.
Enhancements: You can extend this application by adding features like user-specific todos, task deadlines, priorities, and more.
Feel free to customize this README.md further based on the specific details and features of your project. Including screenshots, gifs, or diagrams can also help users better understand your application.
