import AppProvider from '@/providers/app-providers';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/routes';

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
