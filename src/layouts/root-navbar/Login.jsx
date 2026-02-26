import { useState } from 'react';
import useAuthStore from '../../stores/authStore'

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Get everything we need from Zustand in one line
  const { login, isLoading, isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <p>Already logged in → <a href="/profile">Go to profile</a></p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // ← This is the line you wanted — clean & simple
      await login(email, password);

      // Success → redirect (or use react-router navigate)
      window.location.href = '/saved';
      // or: navigate('/profile') if using react-router
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in…' : 'Login'}
        </button>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      </form>
    </div>
  );
}