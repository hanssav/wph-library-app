import AppProvider from '../providers/app-providers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import AuthLayout from './auth/layout';
import Register from './auth/register';
import UserLayout from './user/layout';
import Home from './user/home';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route path='/' element={<Home />}></Route>
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
