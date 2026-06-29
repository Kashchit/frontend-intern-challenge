# Task Management Dashboard

A modern, responsive Task Management Dashboard built for the Frontend Intern Challenge. This application provides a seamless user experience for managing tasks, featuring authentication, full CRUD operations, data visualization, and a clean, minimal UI.

## 🚀 Project Setup & Installation

Follow these instructions to get the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kashchit/frontend-intern-challenge.git
   cd frontend-intern-challenge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to `http://localhost:5173`. 
   *Note: Use the dummy credentials provided on the login screen (`eve.holt@reqres.in` / `cityslicka`).*

## 📜 Available Scripts

In the project directory, you can run the following commands:

- **`npm run dev`**: Starts the Vite development server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles the TypeScript code and builds the application for production using Vite.
- **`npm run lint`**: Runs ESLint (via oxlint) to analyze the code and identify potential syntax or formatting issues.
- **`npm run preview`**: Boots up a local static web server serving files from the `dist` folder, allowing you to preview the production build locally.

## 📁 Folder Structure

The project follows a modular, feature-based architecture to ensure scalability and maintainability:

```text
src/
├── api/             # Axios instances and API request functions (auth, tasks)
├── assets/          # Static assets like images and icons
├── components/      
│   └── ui/          # Reusable, generic UI components (Modal, StatCard, TaskRow, ConfirmDialog)
├── features/        
│   ├── auth/        # Authentication specific logic (AuthContext, schemas)
│   └── tasks/       # Task specific components and logic (TaskContext, TaskForm, schemas)
├── hooks/           # Custom React hooks (useTasks, useMergedTasks, useDebounce)
├── layouts/         # Page layout components (DashboardLayout)
├── pages/           # High-level page components (LoginPage, DashboardPage)
├── routes/          # Routing logic (ProtectedRoute)
├── types/           # Global TypeScript interfaces and types
└── utils/           # Helper functions and utilities (pagination logic)
```

## 🛠 Libraries Used & Why

- **React 19 & React Router DOM**: The core library for building the UI and managing client-side, protected navigation.
- **Vite**: Chosen for its blazing-fast development server, instant HMR, and optimized build process compared to older bundlers like Create React App.
- **TypeScript**: Provides strict static typing, catching errors at compile time and improving developer experience through better autocompletion.
- **Tailwind CSS**: A utility-first CSS framework that allows for rapid, consistent UI development without the overhead of writing custom CSS files.
- **@tanstack/react-query**: State-of-the-art server state management. It handles caching, loading states, and background data fetching effortlessly.
- **react-hook-form & Zod**: `react-hook-form` is used for performant, uncontrolled form validation, while `Zod` provides robust schema-based validation to ensure data integrity before submission.
- **axios**: A promise-based HTTP client that simplifies API requests and interceptor configurations.
- **recharts**: A composable charting library built on React components, used for rendering the visual task statistics on the dashboard.
- **react-toastify**: Provides elegant, easy-to-use toast notifications for immediate user feedback (success/error messages).

## ✨ Features Implemented

1. **Authentication Flow**: Mocked login system using `reqres.in` credentials, protected routes, and persistent session state via `localStorage`.
2. **Dashboard Overview**: Key metrics display (total, completed, pending tasks) and a responsive Recharts bar chart visualizing task statuses.
3. **Task CRUD Operations**:
   - **Create**: Add new tasks with validation.
   - **Read**: Fetch initial tasks from `jsonplaceholder.typicode.com`, paginated, with a detailed view modal.
   - **Update**: Edit existing tasks (title, status, etc.).
   - **Delete**: Remove tasks (with a safe confirmation dialog).
4. **Local State Merging**: Since the external APIs are read-only, a custom `useMergedTasks` hook seamlessly merges the fetched API data with local modifications to simulate a fully working backend experience.
5. **Search & Filtering**: Real-time searching with a custom `useDebounce` hook, along with status-based filtering.
6. **Clean UI/UX**: A minimal, SaaS-style interface that prioritizes usability and responsiveness.

## 🤔 Assumptions Made During Development

- **Read-only APIs**: Because `jsonplaceholder` and `reqres.in` do not actually save data persistently, it was assumed that local state merging was necessary to demonstrate working CRUD functionality during the session.
- **Login API Constraints**: `reqres.in` occasionally requires API keys or fails due to rate limits. The login API was internally mocked to guarantee reviewers can always access the dashboard.
- **Pagination**: The dummy API returns 200 tasks. To make the UI performant, the results were artificially paginated locally to 10 items per page.

## 🚀 Future Improvements (With More Time)

If given more time, I would implement:
1. **End-to-End (E2E) Testing**: Introduce Cypress or Playwright to write comprehensive tests for the authentication and task management flows.
2. **Unit Testing**: Add Vitest and React Testing Library to test individual hooks (like `useMergedTasks`) and complex components.
3. **Drag and Drop Interface**: Implement `dnd-kit` to allow users to visually organize tasks in a Kanban board style layout alongside the list view.
4. **Dark Mode**: Add a manual toggle to switch between the current minimal light theme and a polished dark theme using Tailwind's `dark:` classes.
5. **Real Backend Integration**: Replace the mock merging logic with actual mutations against a real RESTful or GraphQL backend architecture.
