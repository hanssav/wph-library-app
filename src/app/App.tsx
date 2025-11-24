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
import Reviews from './user/reviews';
import BorrowedList from './user/borrowed-list';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />}></Route>

            <Route path='books'>
              <Route index element={<BooksList />} />
              <Route path=':id' element={<BooksDetail />} />
            </Route>

            <Route path='author'>
              <Route path=':id' element={<Author />} />
            </Route>
            <Route path='profile' element={<Profile />} />

            <Route path='cart' element={<Cart />} />
            {/* chceckout and checkout success */}
            <Route path='checkout' element={<Checkout />} />

            {/* Posible deleted */}
            <Route path='reviews' element={<Reviews />} />
            <Route path='borrowed-list' element={<BorrowedList />} />
            {/* Posible deleted */}
          </Route>

          <Route path='/auth' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          {/* Private Dashboard */}
          {/* <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        > */}
          {/* <Route index element={<Overview />} />
            <Route path='profile' element={<Profile />} /> */}
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
