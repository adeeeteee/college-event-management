import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';


function Home() {
  return (
    <div className="app">

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg custom-navbar">

        <div className="container">

          <Link className="navbar-brand" to="/">
            <span className="brand-icon">✦</span>
            Event<span>Hub</span>
          </Link>

          <div className="d-flex align-items-center gap-3">

            <a
              href="#events"
              className="nav-link-custom"
            >
              Events
            </a>

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

          </div>

        </div>

      </nav>


      {/* Hero Section */}
      <section className="hero">

        <div className="hero-glow"></div>

        <div className="container hero-content">

          <div className="badge-custom">
            ✨ COLLEGE EVENT MANAGEMENT
          </div>

          <h1>
            Discover. Participate.
            <br />
            <span>Make an Impact.</span>
          </h1>

          <p>
            One platform to discover college events, register effortlessly,
            track your participation, and manage your achievements.
          </p>

          <div className="hero-buttons">

            <a
              href="#events"
              className="primary-btn"
            >
              Explore Events <span>→</span>
            </a>

            <a
              href="#features"
              className="secondary-btn"
            >
              Learn More
            </a>

          </div>

        </div>

      </section>


      {/* Features */}
      <section
        className="features"
        id="events"
      >

        <div className="container">

          <div className="section-heading">

            <p>EVERYTHING IN ONE PLACE</p>

            <h2>
              Your Events,
              <span> Simplified.</span>
            </h2>

            <div className="heading-line"></div>

          </div>


          <div className="row g-4">

            <div className="col-lg-4">

              <div className="feature-card">

                <div className="icon-box blue">
                  📅
                </div>

                <h3>
                  Discover Events
                </h3>

                <p>
                  Explore technical events, workshops, seminars,
                  cultural programs, competitions and more.
                </p>

                <a href="#events">
                  Browse Events <span>→</span>
                </a>

              </div>

            </div>


            <div className="col-lg-4">

              <div className="feature-card">

                <div className="icon-box purple">
                  ✎
                </div>

                <h3>
                  Easy Registration
                </h3>

                <p>
                  Register for your favourite events in just a few clicks
                  and keep track of your participation.
                </p>

                <a href="#events">
                  Register Now <span>→</span>
                </a>

              </div>

            </div>


            <div className="col-lg-4">

              <div className="feature-card">

                <div className="icon-box gold">
                  🏆
                </div>

                <h3>
                  Your Achievements
                </h3>

                <p>
                  Keep your participation history organized and access
                  your certificates whenever you need them.
                </p>

                <a href="#events">
                  View Certificates <span>→</span>
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="cta-section">

        <div className="container">

          <div className="cta-box">

            <div>

              <p className="cta-small">
                READY TO GET STARTED?
              </p>

              <h2>
                Your next event is waiting.
              </h2>

            </div>

            <Link
              to="/login"
              className="primary-btn"
            >
              Get Started <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* Footer */}
      <footer>

        <div className="container footer-content">

          <div>
            <span className="brand-icon">✦</span>
            EventHub
          </div>

          <p>
            College Event Management System
          </p>

          <p>
            © 2026 EventHub
          </p>

        </div>

      </footer>

    </div>
  );
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Registration */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Coordinator Dashboard */}
        <Route
          path="/coordinator"
          element={<CoordinatorDashboard />}
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;