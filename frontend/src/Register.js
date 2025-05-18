import React, { useState } from 'react';
import { BASE_URL } from './utils';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Registration failed');
        return;
      }

      setSuccess('Registration successful! You can now login.');
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Register</h2>
        {success && <p className="text-success text-center">{success}</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;