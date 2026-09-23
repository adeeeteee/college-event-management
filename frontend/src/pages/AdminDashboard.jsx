import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [activeSection, setActiveSection] =
    useState('dashboard');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const token =
    localStorage.getItem('token');

  const adminName =
    localStorage.getItem('name') ||
    'Administrator';


  // =========================================
  // LOAD DASHBOARD STATISTICS
  // =========================================

  const loadDashboard = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        'http://localhost:8080/api/admin/dashboard',
        {
          method: 'GET',
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to load dashboard'
        );
      }

      setStats(data);

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================
  // LOAD USERS
  // =========================================

  const loadUsers = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        'http://localhost:8080/api/admin/users',
        {
          method: 'GET',
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to load users'
        );
      }

      setUsers(data);

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================
  // LOAD EVENTS
  // =========================================

  const loadEvents = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        'http://localhost:8080/api/admin/events',
        {
          method: 'GET',
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to load events'
        );
      }

      setEvents(data);

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================
  // LOAD REGISTRATIONS
  // =========================================

  const loadRegistrations = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        'http://localhost:8080/api/admin/registrations',
        {
          method: 'GET',
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to load registrations'
        );
      }

      setRegistrations(data);

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setLoading(false);
    }
  };


  // =========================================
// INITIAL LOAD
// =========================================

useEffect(() => {

  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadDashboard();

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  // =========================================
  // SECTION HANDLER
  // =========================================

  const handleSectionChange = (
    section
  ) => {

    setActiveSection(section);

    if (section === 'dashboard') {

      loadDashboard();

    } else if (section === 'users') {

      loadUsers();

    } else if (section === 'events') {

      loadEvents();

    } else if (section === 'registrations') {

      loadRegistrations();
    }
  };


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="dashboard-page">

      <div className="container dashboard-content">


        {/* =====================================
            HEADER
        ===================================== */}

        <div className="dashboard-header">

          <p className="dashboard-label">
            COLLEGE EVENT MANAGEMENT
          </p>

          <h1>
            Administrator Dashboard
          </h1>

          <p>
            Welcome, {adminName}
          </p>


          <div className="dashboard-header-buttons">

            <button
              type="button"
              className={
                activeSection === 'dashboard'
                  ? 'primary-btn'
                  : 'secondary-btn'
              }
              onClick={() =>
                handleSectionChange(
                  'dashboard'
                )
              }
            >
              📊 Dashboard
            </button>


            <button
              type="button"
              className={
                activeSection === 'users'
                  ? 'primary-btn'
                  : 'secondary-btn'
              }
              onClick={() =>
                handleSectionChange(
                  'users'
                )
              }
            >
              👥 Users
            </button>


            <button
              type="button"
              className={
                activeSection === 'events'
                  ? 'primary-btn'
                  : 'secondary-btn'
              }
              onClick={() =>
                handleSectionChange(
                  'events'
                )
              }
            >
              📅 Events
            </button>


            <button
              type="button"
              className={
                activeSection === 'registrations'
                  ? 'primary-btn'
                  : 'secondary-btn'
              }
              onClick={() =>
                handleSectionChange(
                  'registrations'
                )
              }
            >
              📝 Registrations
            </button>


            <Link
              to="/"
              className="btn btn-outline-danger logout-btn"
            >
              Logout
            </Link>

          </div>

        </div>


        {/* =====================================
            ERROR
        ===================================== */}

        {error && (

          <div className="alert alert-danger mb-4">

            {error}

          </div>

        )}


        {/* =====================================
            LOADING
        ===================================== */}

        {loading && (

          <div className="text-center py-4">

            <div
              className="spinner-border text-primary"
              role="status"
            >
            </div>

            <p className="mt-3">
              Loading...
            </p>

          </div>

        )}


        {/* =====================================
            DASHBOARD
        ===================================== */}

        {!loading &&
          activeSection === 'dashboard' &&
          stats && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                SYSTEM OVERVIEW
              </p>

              <h2>
                Dashboard Statistics
              </h2>

              <div className="heading-line"></div>

            </div>


            <div className="row g-4">


              {/* TOTAL USERS */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    👥
                  </div>

                  <p className="admin-stat-label">
                    TOTAL USERS
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalUsers}
                  </h3>

                </div>

              </div>


              {/* STUDENTS */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    🎓
                  </div>

                  <p className="admin-stat-label">
                    STUDENTS
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalStudents}
                  </h3>

                </div>

              </div>


              {/* COORDINATORS */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    🧑‍💼
                  </div>

                  <p className="admin-stat-label">
                    COORDINATORS
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalCoordinators}
                  </h3>

                </div>

              </div>


              {/* ADMINS */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    🛡️
                  </div>

                  <p className="admin-stat-label">
                    ADMINISTRATORS
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalAdmins}
                  </h3>

                </div>

              </div>


              {/* EVENTS */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    📅
                  </div>

                  <p className="admin-stat-label">
                    TOTAL EVENTS
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalEvents}
                  </h3>

                </div>

              </div>


              {/* REGISTRATIONS */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    📝
                  </div>

                  <p className="admin-stat-label">
                    REGISTRATIONS
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalRegistrations}
                  </h3>

                </div>

              </div>


              {/* PRESENT */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    ✅
                  </div>

                  <p className="admin-stat-label">
                    PRESENT
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.presentAttendance}
                  </h3>

                </div>

              </div>


              {/* CERTIFICATES */}

              <div className="col-md-6 col-lg-3">

                <div className="event-card admin-stat-card">

                  <div className="admin-stat-icon">
                    🏆
                  </div>

                  <p className="admin-stat-label">
                    CERTIFICATES
                  </p>

                  <h3 className="admin-stat-number">
                    {stats.totalCertificates}
                  </h3>

                </div>

              </div>

            </div>


            {/* ATTENDANCE SUMMARY */}

            <div className="event-card mt-4">

              <div className="event-card-header">

                <span className="event-badge">
                  ATTENDANCE
                </span>

              </div>

              <h3>
                Attendance Overview
              </h3>

              <div className="event-details">

                <div>

                  <span className="detail-icon">
                    ✅
                  </span>

                  <div className="detail-content">

                    <strong>
                      PRESENT
                    </strong>

                    <span>
                      {stats.presentAttendance}
                    </span>

                  </div>

                </div>


                <div>

                  <span className="detail-icon">
                    ❌
                  </span>

                  <div className="detail-content">

                    <strong>
                      ABSENT
                    </strong>

                    <span>
                      {stats.absentAttendance}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* =====================================
            USERS
        ===================================== */}

        {!loading &&
          activeSection === 'users' && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                USER MANAGEMENT
              </p>

              <h2>
                All Users
              </h2>

              <div className="heading-line"></div>

            </div>


            {users.length === 0 ? (

              <div className="empty-events">

                <h3>
                  No Users Found
                </h3>

              </div>

            ) : (

              <div className="row g-4">

                {users.map(
                  (user) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={user.userId}
                  >

                    <div className="event-card">

                      <div className="event-card-header">

                        <span className="event-badge">
                          {user.role}
                        </span>

                        <span>
                          #{user.userId}
                        </span>

                      </div>

                      <h3>
                        {user.name}
                      </h3>

                      <div className="event-details">

                        <div>

                          <span className="detail-icon">
                            📧
                          </span>

                          <div className="detail-content">

                            <strong>
                              EMAIL
                            </strong>

                            <span>
                              {user.email}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            🛡️
                          </span>

                          <div className="detail-content">

                            <strong>
                              ROLE
                            </strong>

                            <span>
                              {user.role}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

              </div>

            )}

          </div>

        )}


        {/* =====================================
            EVENTS
        ===================================== */}

        {!loading &&
          activeSection === 'events' && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                EVENT MONITORING
              </p>

              <h2>
                All Events
              </h2>

              <div className="heading-line"></div>

            </div>


            {events.length === 0 ? (

              <div className="empty-events">

                <h3>
                  No Events Found
                </h3>

              </div>

            ) : (

              <div className="row g-4">

                {events.map(
                  (event) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={event.eventId}
                  >

                    <div className="event-card">

                      <div className="event-card-header">

                        <span className="event-badge">
                          EVENT
                        </span>

                        <span>
                          #{event.eventId}
                        </span>

                      </div>

                      <h3>
                        {event.name}
                      </h3>

                      <p className="event-description">
                        {event.description}
                      </p>

                      <div className="event-details">

                        <div>

                          <span className="detail-icon">
                            📅
                          </span>

                          <div className="detail-content">

                            <strong>
                              DATE
                            </strong>

                            <span>
                              {event.date}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            ⏰
                          </span>

                          <div className="detail-content">

                            <strong>
                              TIME
                            </strong>

                            <span>
                              {event.time}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            📍
                          </span>

                          <div className="detail-content">

                            <strong>
                              VENUE
                            </strong>

                            <span>
                              {event.venue}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            👥
                          </span>

                          <div className="detail-content">

                            <strong>
                              CAPACITY
                            </strong>

                            <span>
                              {event.capacity}
                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

              </div>

            )}

          </div>

        )}


        {/* =====================================
            REGISTRATIONS
        ===================================== */}

        {!loading &&
          activeSection === 'registrations' && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                PARTICIPATION MONITORING
              </p>

              <h2>
                All Registrations
              </h2>

              <div className="heading-line"></div>

            </div>


            {registrations.length === 0 ? (

              <div className="empty-events">

                <h3>
                  No Registrations Found
                </h3>

              </div>

            ) : (

              <div className="row g-4">

                {registrations.map(
                  (registration) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={
                      registration.registrationId
                    }
                  >

                    <div className="event-card">

                      <div className="event-card-header">

                        <span className="event-badge">
                          {registration.status}
                        </span>

                        <span>
                          #{registration.registrationId}
                        </span>

                      </div>

                      <h3>
                        {registration.eventName}
                      </h3>

                      <div className="event-details">

                        <div>

                          <span className="detail-icon">
                            👤
                          </span>

                          <div className="detail-content">

                            <strong>
                              STUDENT
                            </strong>

                            <span>
                              {registration.studentName}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            📅
                          </span>

                          <div className="detail-content">

                            <strong>
                              EVENT DATE
                            </strong>

                            <span>
                              {registration.eventDate}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            📍
                          </span>

                          <div className="detail-content">

                            <strong>
                              VENUE
                            </strong>

                            <span>
                              {registration.eventVenue}
                            </span>

                          </div>

                        </div>


                        <div>

                          <span className="detail-icon">
                            🕒
                          </span>

                          <div className="detail-content">

                            <strong>
                              REGISTERED ON
                            </strong>

                            <span>

                              {registration.registrationDate
                                ? new Date(
                                    registration.registrationDate
                                  ).toLocaleString()
                                : 'N/A'}

                            </span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                )
              )}

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;