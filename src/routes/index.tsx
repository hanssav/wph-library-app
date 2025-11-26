import AuthLayout from '@/app/auth/layout';
import Login from '@/app/auth/login';
import Register from '@/app/auth/register';
import AdminUsers from '@/app/dashboard';
import Layout from '@/app/layout';
import Author from '@/app/user/author/id';
import BooksDetail from '@/app/user/books/detail';
import BooksList from '@/app/user/books/list';
import Cart from '@/app/user/cart';
import Checkout from '@/app/user/checkout';
import Home from '@/app/user/home';
import Profile from '@/app/user/profile';
import BorrowedList from '@/app/user/profile/borrowed-list';
import ProfileLayout from '@/app/user/profile/layout';
import Reviews from '@/app/user/profile/reviews';
import NotFoundPage from '@/components/container/not-found';
import ProtectedRoute from '@/components/pages/auth/protected-route';
import { Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='books'>
          <Route index element={<BooksList />} />
          <Route path=':id' element={<BooksDetail />} />
        </Route>
        <Route path='author/:id' element={<Author />} />
      </Route>

      <Route
        path='/auth'
        element={
          <ProtectedRoute requireAuth={false}>
            <AuthLayout />
          </ProtectedRoute>
        }
      >
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>

      <Route
        element={
          <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path='profile' element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='borrowed-list' element={<BorrowedList />} />
        </Route>
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>

      <Route
        path='/dashboard'
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path='users' element={<AdminUsers />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
