<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=40&pause=1000&color=3B82F6&center=true&vCenter=true&width=600&lines=SnapCode+🚀;Cloud-based+Code+Execution;Write.+Run.+Share." alt="Typing SVG" />

  <p align="center">
    <strong>A blazing fast, cloud-based code execution platform built with modern web tech.</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  </p>
</div>

---

## 🌟 What is SnapCode?

CodeSnap is a cloud-based code execution platform that allows developers to write, run, and share code snippets seamlessly in the browser. Built with modern web technologies, it features a highly interactive code editor, real-time compilation feedback, and a robust user authentication and credit management system.

## ✨ Features

- 🌍 **Multi-Language Support**: Write and execute code in 15+ programming languages including JavaScript, Python, C++, Java, and more.
- ⚡ **Real-Time Code Execution**: Powered by the JDoodle API to provide secure, blazing-fast remote code execution and compilation feedback directly in the browser.
- 💳 **Credit & Rate-Limiting System**: Integrated daily execution limits (10 free runs per day) using lazy initialization in MongoDB, preventing API quota overages while supporting premium tier unlocks.
- 🔐 **User Authentication**: Secure login and session management powered by NextAuth.js, supporting both Email/Password and Google OAuth.
- 🏆 **Friend Coding Challenges**: Dedicated full-screen challenge pages to compete and share code with friends.
- 🎨 **Responsive & Dynamic UI**: A beautiful, glassmorphism-inspired interface built with Tailwind CSS and NextUI, ensuring a premium developer experience across all devices.
- 🔄 **Global State Management**: Utilizing Zustand for zero-lag state synchronization between the editor, execution engine, and user credit displays.

## 🏗️ Architecture

SnapCode utilizes a modern client-server architecture with Next.js 14 App Router, integrating server actions for backend logic, MongoDB for data persistence, and JDoodle API for isolated code execution.

<div align="center">
  <img src="https://img.shields.io/badge/Architecture-Client%20Server-blue?style=flat-square" alt="Architecture" />
</div>

## 📊 Database Schema Review

SnapCode uses MongoDB. Here are the core data models that drive the application:

### 👤 User Model (`users`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier for the user |
| `name` | `string` | User's display name |
| `email` | `string` | User's email address |
| `password` | `string` | Hashed password (if using credentials) |
| `credits` | `number` | Daily code execution credits (default 10) |
| `lastCreditReset` | `Date` | Timestamp of the last time credits were refreshed |
| `isPremium` | `boolean` | Flag for premium users with unlimited execution |
| `createdAt` / `updatedAt` | `Date` | Timestamps for account creation and updates |

### 📝 Snap Model (`snaps`)
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | `ObjectId` | Unique identifier for the code snippet |
| `name` | `string` | Title of the code snippet |
| `language` | `string` | Programming language used (e.g., 'python', 'javascript') |
| `code` | `string` | The actual source code content |
| `visibility` | `string` | 'public' or 'private' snippet visibility |
| `authorId` | `string` | Reference to the User `_id` who created the snap |
| `createdAt` / `updatedAt` | `Date` | Timestamps for snippet creation and updates |

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, NextUI, Framer Motion
- **Backend**: Next.js Server Actions, NextAuth.js
- **Database**: MongoDB (Mongoose/MongoDB Adapter)
- **State Management**: Zustand, React Hook Form
- **Code Execution API**: JDoodle API
- **Deployment**: Render (Configured with automated GitHub Actions keep-alive workflows to prevent cold starts)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine. You will also need a MongoDB database and JDoodle API credentials.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/codesnap.git
   cd codesnap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open the app**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Create a `.env.local` file in the root directory and add the following:
```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXT_AUTH_SECRET=your_nextauth_secret

# Google OAuth (Optional)
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JDoodle API
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
```

## 🔌 API Integration

SnapCode integrates with the JDoodle API for real-time remote code execution. Ensure your JDoodle client ID and secret are configured in the environment variables to allow successful code compilation and execution.

## 🛡️ Authentication

User authentication is handled securely using NextAuth.js. It supports multiple strategies including Email/Password and Google OAuth, seamlessly integrating with MongoDB to store user sessions and profile data.

## ⚖️ Execution Limits

To manage API costs and prevent abuse, SnapCode enforces daily execution limits. By default, users receive 10 free runs per day. This system is backed by MongoDB and lazily initializes user quotas upon their first execution of the day.

## 📁 Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and backend configurations
- `lib/db/` - MongoDB collections and schemas
- `stores/` - Zustand global state stores
- `styles/` - Global CSS and Tailwind configurations

## ⚠️ Common Issues

- **Code execution fails**: Verify that your JDoodle API credentials in the `.env` file are correct and that you haven't exceeded your JDoodle quota.
- **Database connection error**: Ensure your MongoDB instance is running and the `MONGODB_URI` is correctly set.

## 🔮 Future Improvements

- ✨ Support for more programming languages.
- 🤝 Advanced collaboration features like real-time pair programming.
- 📈 Enhanced analytics for users' code executions and performance.
