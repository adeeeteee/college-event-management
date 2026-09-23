import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();

    setError('');
    setSuccess('');


    // Password validation
    if (password !== confirmPassword) {

      setError(
        'Passwords do not match'
      );

      return;
    }


    if (password.length < 6) {

      setError(
        'Password must contain at least 6 characters'
      );

      return;
    }


    setLoading(true);


    try {

      const response = await fetch(
        'http://localhost:8080/api/users',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({

            name: name,

            email: email,

            password: password,

            role: 'STUDENT'

          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to create account'
        );

      }


      setSuccess(
        'Account created successfully! Redirecting to login...'
      );


      // Clear form
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');


      // Go back to login
      setTimeout(() => {

        navigate('/login');

      }, 1500);


    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="login-page">

      <div className="login-card">


        {/* LOGO */}

        <div className="login-logo">

          <span>✦</span>
          EventHub

        </div>


        {/* TITLE */}

        <h1>
          Create Account
        </h1>


        <p className="login-subtitle">

          Register as a student to participate
          in college events

        </p>


        {/* REGISTRATION FORM */}

        <form onSubmit={handleRegister}>


          {/* NAME */}

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email Address
            </label>

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


          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* CONFIRM PASSWORD */}

          <div className="form-group">

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>


          {/* ROLE */}

          <div className="form-group">

            <label>
              Account Type
            </label>

            <input
              type="text"
              value="Student"
              disabled
            />

          </div>


          {/* ERROR */}

          {error && (

            <div className="login-error">

              {error}

            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div
              className="alert alert-success"
              style={{
                marginBottom: '16px'
              }}
            >

              {success}

            </div>

          )}


          {/* BUTTON */}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >

            {loading
              ? 'Creating Account...'
              : 'Create Account →'}

          </button>


        </form>


        {/* DIVIDER */}

        <div className="login-divider">

          <span>or</span>

        </div>


        {/* BACK TO LOGIN */}

        <p className="login-footer">

          Already have an account?

          <Link to="/login">
            {' '}Sign in
          </Link>

        </p>


      </div>

    </div>

  );

}

export default Register;