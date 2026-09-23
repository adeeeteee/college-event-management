import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:8080/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Invalid email or password'
        );
      }

      // Store login information
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      localStorage.setItem('role', data.role);

      // Redirect based on actual role from backend
      if (data.role === 'STUDENT') {
        navigate('/student');
      } else if (data.role === 'COORDINATOR') {
        navigate('/coordinator');
      } else if (data.role === 'ADMIN') {
        navigate('/admin');
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <span>✦</span>EventHub
        </div>

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to manage your college events
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Login As</label>

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option>Student</option>
              <option>Event Coordinator</option>
              <option>Administrator</option>
            </select>

          </div>


          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {error && (
            <div className="login-error">
              {error}
            </div>
          )}


          <div className="login-options">

            <label className="remember">

              <input type="checkbox" />

              Remember me

            </label>

            <a
              href="#forgot-password"
              onClick={(e) => e.preventDefault()}
            >
              Forgot password?
            </a>

          </div>


          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? 'Signing In...'
              : 'Sign In →'}
          </button>

        </form>


        <div className="login-divider">
          <span>or</span>
        </div>


        <p className="login-footer">

          Don't have an account?

          <Link to="/register">
            {' '}Create one
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;