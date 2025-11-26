import { useAppSelector } from '@/store';
import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@/type';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
};

const ProtectedRoute = ({
  children,
  allowedRoles,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, token } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!token && !!user;
  const userRole = user?.role;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    const defaultRoute = getDefaultRouteForRole(userRole);
    return <Navigate to={defaultRoute} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!isAuthenticated) {
      return <Navigate to='/auth/login' state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(userRole as UserRole)) {
      const defaultRoute = getDefaultRouteForRole(userRole);
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return <>{children}</>;
};
// Helper function to get default route based on user role
export const getDefaultRouteForRole = (role?: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return '/dashboard';
    case 'USER':
      return '/';
    default:
      return '/';
  }
};

export default ProtectedRoute;
