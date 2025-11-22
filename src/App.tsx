import './App.css';
import AppProvider from './providers/app-providers';
import Login from './app/auth/login';

function App() {
  return (
    <div className='bg-white min-h-screen'>
      <AppProvider>
        <Login />
      </AppProvider>
    </div>
  );
}

export default App;
