import { AuthProvider, useAuth } from './auth/AuthContext';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const { token } = useAuth();
  return token ? <Contacts /> : <Login />;
}

export default function App() {
  return (
    <>
   <Toaster position="top-right" /> 
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    </>
  );
}
