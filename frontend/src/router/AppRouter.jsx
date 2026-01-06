import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleRoute from '../components/common/RoleRoute';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import StudentDashboard from '../pages/student/StudentDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/student/dashboard" />}
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/student/dashboard"
        element={
          <RoleRoute allowedRoles={['student']}>
            <StudentDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RoleRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleRoute>
        }
      />

      <Route
        path="/"
        element={
          <Navigate to={user ? '/student/dashboard' : '/login'} replace />
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
