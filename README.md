<div align="center">
  <img height="70px" src="https://github.com/user-attachments/assets/89a292d5-674e-41de-b0de-6af88c2042b3" alt="CodeSnap favicon">
  <h1>SnapCode – Create, Run & Share Code Snippets</h1>
  <a href="">View Demo</a>
  ·
  <a href="https://github.com/harshmishra00/SnapCode/issues/new?assignees=&labels=&projects=&template=bug_report.yml&title=">Report Bug</a>
  ·
  <a href="https://github.com/harshmishra00/SnapCode/issues/new?assignees=&labels=&projects=&template=feature_request.yml&title=">Request Feature</a>
  <br/>  
  <br/>

![excited](https://github.com/user-attachments/assets/48f47285-cfe2-41db-8b50-a6a57987c6e9)

<!-- ![GitHub Created At](https://img.shields.io/github/created-at/harshmishra00/CodeSnap)
![GitHub repo size](https://img.shields.io/github/repo-size/harshmishra00/CodeSnap)
![GitHub License](https://img.shields.io/github/license/harshmishra00/CodeSnap)
![GitHub stars](https://img.shields.io/github/stars/harshmishra00/CodeSnap?style=default)
![GitHub forks](https://img.shields.io/github/forks/harshmishra00/CodeSnap?style=default)
![Wakatime](https://wakatime.com/badge/github/harshmishra00/CodeSnap.svg) -->

</div>

Welcome to **CodeSnap**, a lightweight app for creating, sharing, running, and viewing code snippets with ease. Built to
simplify code sharing, CodeSnap enables users to generate a shareable link for any snippet, making collaboration more
efficient and accessible.

## Table of Contents

- [Overview](#overview)
    - [Why CodeSnap?](#why-codesnap)
    - [Technologies Used](#technologies-used)
    - [Features](#features)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
    - [Building for Production](#building-for-production)
    - [Linting and Formatting](#linting-and-formatting)
- [Contributing](#contributing)
- [Links](#links)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Overview

### Why CodeSnap?

**CodeSnap** was created to provide an easy-to-use solution for sharing code snippets, making collaboration faster and
more intuitive. The platform supports syntax highlighting, code editing, and live code execution, so you can showcase
and test code within seconds.

### Technologies Used

<p> 
  <img src="https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" height="30px"> 
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" height="30px"> 
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" height="30px"> 
  <img src="https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" height="30px"> 
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" height="30px">
  <img src="https://img.shields.io/badge/monaco-%23007ACC.svg?style=for-the-badge&logo=microsoft&logoColor=white" alt="Monaco Editor" height="30px">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript" height="30px">
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" height="30px">
  <img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black" alt="Prettier" height="30px">
</p>

### Features

- **Real-time Code Editor**: Built with Monaco, the editor offers syntax highlighting, code completion, and error handling across 40 languages.
- **Live Code Execution**: Test code snippets in real-time via the integrated Piston API.
- **MongoDB Integration**: Local MongoDB Community Server backend for storing users, auth accounts, sessions, and code snippets.
- **Responsive Design**: Optimized for both desktop and mobile.
- **Sharing Made Easy**: Generate and share links with a single click.

## Getting Started

### Prerequisites

- **Node.js** (>= 18.18.0, recommended >= 20.0.0)
- **npm** (>= 10.0.0)
- **MongoDB Community Server** (running locally on port 27017)
- **MongoDB Compass** (optional, for visual DB management)

### Database Setup (MongoDB)

1. Install and start MongoDB Community Server locally via Homebrew:

    ```bash
    brew tap mongodb/brew
    brew install mongodb-community
    brew services start mongodb-community
    ```

2. Connect via MongoDB Compass or shell to inspect:
    - Connection URI: `mongodb://127.0.0.1:27017`
    - Database Name: `codesnap_db`

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/harshmishra00/CodeSnap.git
    cd CodeSnap
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure Environment Variables:**

    Copy `.env.example` to `.env.local`:

    ```bash
    cp .env.example .env.local
    ```

    Ensure `.env.local` contains:

    ```env
    MONGODB_URI="mongodb://127.0.0.1:27017/codesnap_db"
    NEXT_AUTH_SECRET="local_dev_secret_key_codesnap"
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to interact with CodeSnap.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

### Linting and Formatting

To lint your code, run:

```bash
npm run lint
```

or

```bash
yarn lint
```

To format your code, run:

```bash
npm run format
```

or

```bash
yarn format
```

## Contributing

Contributions to CodeSnap are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature-name
    ```

3. Make your changes and commit them with clear, descriptive messages.
4. Push your changes to your fork:

    ```bash
    git push origin feature-name
    ```

5. Open a pull request, detailing the changes and improvements you’ve made.

## Links

| Environment        | Link                                           |
| ------------------ | ---------------------------------------------- |
| Development Server | [beta.codesnap.pro](https://beta.codesnap.pro) |
| Production Server  | [codesnap.pro](https://www.codesnap.pro)       |

## Contact

<table>
  <tr>
    <th></th>
    <th>Social Media</th>
    <th>Username</th>
    <th>Link</th>
  </tr>
  <tr>
    <td><img src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" width="20" /></td>
    <td>Email</td>
    <td><code>harshmishra@example.com</code></td>
    <td><a href="mailto:harshmishra@example.com" target="_blank">Email</a></td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png" width="20" /></td>
    <td>LinkedIn</td>
    <td><code>Harsh Mishra</code></td>
    <td><a href="https://www.linkedin.com/in/harshmishra00/" target="_blank">LinkedIn</a></td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" width="20" /></td>
    <td>Instagram</td>
    <td><code>harshmishra00</code></td>
    <td><a href="https://www.instagram.com/harshmishra00/" target="_blank">Instagram</a></td>
  </tr>
  <tr>
    <td><img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png" width="20" /></td>
    <td>Facebook</td>
    <td><code>HarshMishra</code></td>
    <td><a href="https://www.facebook.com/HarshMishra/" target="_blank">Facebook</a></td>
</tr>
</table>

_Feel free to reach out if you have questions or just want to chat about web adventures!_

## Acknowledgments

This project wouldn't be possible without the collaboration and resources of the developer community. Thanks to the
community and tools like React and Nextjs. Special appreciation goes to friends and family. I hope it inspires further
learning.

---

<p align="center">
   Thank you for using <strong>CodeSnap</strong>! Happy coding! 👨‍💻
</p>
