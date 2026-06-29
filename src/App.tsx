import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@/features/auth/AuthContext';
import { TaskProvider } from '@/features/tasks/TaskContext';
import ProtectedRoute from '@/routes/ProtectedRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
              </Route>

              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />
        </TaskProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;