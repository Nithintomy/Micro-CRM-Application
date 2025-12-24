import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { logout } = useAuth();

  return (
    <header className="app-header">
      <div className="header-spacer" />
      <h2 className="header-title">Micro-CRM</h2>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
}
