import AppProvider from '../providers/app-providers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import AuthLayout from './auth/layout';
import Register from './auth/register';
import UserLayout from './user/layout';
import Home from './user/home';
import BooksDetail from './user/books/detail';
import BooksList from './user/books/list';
import Author from './user/author/id';
import Cart from './user/cart';
import Checkout from './user/checkout';
import Profile from './user/profile';
import Reviews from './user/profile/reviews';
import BorrowedList from './user/profile/borrowed-list';
import ProfileLayout from './user/profile/layout';
import ProtectedRoute from '@/components/pages/auth/protected-route';
import NotFoundPage from '@/components/container/not-found';
import DashboardLayout from './dashboard/layout';
import AdminUsers from './dashboard';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='books'>
              <Route index element={<BooksList />} />
              <Route path=':id' element={<BooksDetail />} />
            </Route>
            <Route path='author'>
              <Route path=':id' element={<Author />} />
            </Route>
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
            path='/'
            element={
              <ProtectedRoute allowedRoles={['USER', 'ADMIN']}>
                <UserLayout />
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
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path='users' element={<AdminUsers />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
