import AuthLayout from '@/app/auth/layout';
import Login from '@/app/auth/login';
import Register from '@/app/auth/register';
import AdminBookList from '@/app/dashboard/admin-book';
import AdminBookForm from '@/app/dashboard/admin-book/form';
import AdminBookDetail from '@/app/dashboard/admin-book/id';
import AdminBorrowedList from '@/app/dashboard/admin-borrowed';
import AdminUsers from '@/app/dashboard/admin-users';
import LayoutDashboardTabMenu from '@/app/dashboard/layout';
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
import ProtectedRoute from '@/routes/protected-route';
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

      <Route path='/dashboard'>
        <Route
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route element={<LayoutDashboardTabMenu />}>
            <Route index element={<AdminUsers />} />
            <Route path='users' element={<AdminUsers />} />
            <Route path='borrowed-list' element={<AdminBorrowedList />} />
            <Route path='book-list' element={<AdminBookList />} />{' '}
          </Route>

          <Route path='book-list/:id' element={<AdminBookDetail />} />
          <Route
            path='book-list/new'
            element={<AdminBookForm mode='create' />}
          />
          <Route
            path='book-list/:id/edit'
            element={<AdminBookForm mode='edit' />}
          />
        </Route>
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
