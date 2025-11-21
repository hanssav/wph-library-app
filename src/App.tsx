import './App.css';
import AppProvider from './providers/app-providers';

function App() {
  return (
    <div className='bg-white min-h-screen'>
      <AppProvider>our component</AppProvider>
    </div>
  );
}

export default App;
