import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import DashboardPage from './pages/DashboardPage';
import BillingPage from './pages/BillingPage';
import PurchasesPage from './pages/PurchasesPage';
import ReportsPage from './pages/ReportsPage';
import UserGuide from './components/UserGuide';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
        <UserGuide />
      </Router>
    </AppProvider>
  );
}

export default App;
 