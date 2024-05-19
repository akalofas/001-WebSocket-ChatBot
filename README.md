
## WebSocket ChatBot Documentation

## Overview

WebSocket ChatBot is a real-time chat application designed to provide a basic yet robust platform for users to exchange messages instantly. The application is built using Node.js and Express, with `socket.io` for WebSocket connections allowing real-time bi-directional communication between web clients and servers.

## Key Features

- **Real-Time Communication**: Utilizes WebSockets to enable users to send and receive messages without needing to refresh the web page.
- **Flexible User Interface**: Responsive design implemented using CSS Flexbox.
- **No Persistence**: The chat does not store messages or user data persistently. Once the server restarts, all previous messages are lost, making it suitable for temporary chat sessions.

## Project Structure

### Main Components

- **Server (`index.js`)**: Initializes the server using Express and sets up WebSocket communication.
- **Client (`public/index.html`, `public/script.js`, `public/style.css`)**: The front-end part of the application, including HTML for structure, CSS for styling, and JavaScript for handling client-side logic.

### Dependencies

- `express`: Framework for handling server-side logic.
- `socket.io`: Enables real-time, bidirectional communication between web clients and server.
- `nodemon`: Utility that monitors for any changes in your source and automatically restarts your server (used in development).

## Setup and Running

- **Installation**: Run `npm install` to install all dependencies.
- **Starting the Server**: Execute `npm start` to launch the application. The server will be available at `http://localhost:9000` by default.
- **Environment Variables**: Ensure `.env` contains the correct PORT setting if not using the default.

## Repository

- **GitHub**: [WebSocket ChatBot](https://github.com/akalofas/001-WebSocket-ChatBot) - Visit the GitHub repository for source code and issue tracking.

## Future Changes and Development Roadmap

As the WebSocket ChatBot evolves, each new feature will be developed and showcased in dedicated branches. This approach ensures a clear, incremental development path from the basic functionality to a more sophisticated chat application.

### Branching Strategy

- **Isolated Feature Development**: Each branch will focus on a single, significant enhancement. This ensures that the master branch remains clean and stable, reflecting the project's core as a simple chat platform.
- **No Direct Commits to Main Branch**: To maintain the educational integrity of the step-by-step evolution in project complexity, branches will not be merged back into the main branch. Instead, they will stand as individual milestones for different stages of functionality.

### Sequential Development Plan

1. **User Registration and Authentication**

   - **Branch**: `feature/user-auth`
   - **Description**: Implement user registration and authentication to establish a user base. This is crucial for identifying participants in chats, securing user sessions, and enabling personalized features.
   - **Dependencies**: None. This serves as the foundation for personalized and secure interactions.
2. **Private Messaging**

   - **Branch**: `feature/private-messaging`
   - **Description**: With authentication in place, develop the capability for users to send messages privately to one another. This involves creating UI components for selecting recipients and modifying the backend to handle routing messages between specified users.
   - **Dependencies**: User authentication must be established first to ensure that messages are sent and received by verified users.
3. **Persistent Chat History**

   - **Branch**: `feature/persistent-history`
   - **Description**: Add functionality to log and retrieve chat histories from a database. This will allow users to view past conversations and continue from where they left off.
   - **Dependencies**: User authentication is required to link chat logs to specific user accounts securely.
4. **Chatbot with AI Capabilities**

   - **Branch**: `feature/ai-chatbot`
   - **Description**: Enhance the platform with an AI-driven chatbot that can interact with users autonomously. This chatbot will use natural language processing to understand and respond to user inquiries.
   - **Dependencies**: Having established user interactions and data logging, the AI chatbot can leverage existing structures and potentially use historical data to improve its responses.

### Contribution Guidelines

- **Collaboration**: Developers interested in contributing to the project are encouraged to fork the repository, work on a feature-specific branch, and maintain alignment with the outlined branching strategy.
- **Feedback and Issues**: Contributions in the form of feedback, bug reports, or feature suggestions are highly valued. Please use the GitHub issues tracker to submit feedback or contact the project maintainers directly.

## Getting Involved

For more information on how to get involved or to understand the specifics of each branch, please refer to the repository's README files within each branch or contact the project maintainers directly via the repository's "Issues" section.
