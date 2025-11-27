import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@/type';
import { useUser } from '@/hooks';
import React from 'react';

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
  const { user, token, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
      </div>
    );
  }

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

export const getDefaultRouteForRole = (role?: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return '/dashboard/users';
    case 'USER':
      return '/';
    default:
      return '/';
  }
};

export default ProtectedRoute;
