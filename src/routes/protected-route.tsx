import { Navigate, useLocation } from 'react-router-dom';
import type { UserRole } from '@/type';
import { useMe } from '@/hooks';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setCredentials, clearAuth } from '@/store/slices';

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
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  const { data, isLoading, isError } = useMe({ enabled: !!token });
  const user = data?.data;

  useEffect(() => {
    if (isLoading) return;

    if (token && user) {
      dispatch(setCredentials({ token, user: user }));
    } else {
      dispatch(clearAuth());
    }
  }, [user, isLoading, isError, dispatch, token]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full size-20 border-b-2 border-primary-500' />
      </div>
    );
  }

  const isAuthenticated = !!token && user;
  const userRole = user?.profile.role;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
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
