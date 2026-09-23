import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CertificatePreview from '../components/CertificatePreview';

function StudentDashboard() {

  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // =========================================
  // CERTIFICATE MANAGEMENT
  // =========================================

  const [certificates, setCertificates] = useState([]);
  const [showCertificates, setShowCertificates] =
    useState(false);

  const [loadingCertificates, setLoadingCertificates] =
    useState(false);

  const [certificateError, setCertificateError] =
    useState('');

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const [showRegistrations, setShowRegistrations] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [loadingRegistrations, setLoadingRegistrations] =
    useState(false);

  const [error, setError] =
    useState('');

  const [registrationError, setRegistrationError] =
    useState('');

  const [registeringEventId, setRegisteringEventId] =
    useState(null);

  const [cancellingRegistrationId, setCancellingRegistrationId] =
    useState(null);

  const [successMessage, setSuccessMessage] =
    useState('');

  const token =
    localStorage.getItem('token');

  const studentId =
    localStorage.getItem('userId');


  // =========================================
  // LOAD EVENTS
  // =========================================

  const loadEvents = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        'http://localhost:8080/api/events',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {

        throw new Error(
          'Unable to load events'
        );
      }

      const data =
        await response.json();

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

      setLoadingRegistrations(true);
      setRegistrationError('');

      const response = await fetch(
        `http://localhost:8080/api/student/registrations?studentId=${studentId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
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

      setRegistrationError(
        error.message
      );

    } finally {

      setLoadingRegistrations(false);
    }
  };


  // =========================================
  // LOAD STUDENT CERTIFICATES
  // =========================================

  const loadCertificates = async () => {

    try {

      setLoadingCertificates(true);
      setCertificateError('');

      const response = await fetch(
        `http://localhost:8080/api/student/certificates?studentId=${studentId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to load certificates'
        );
      }

      setCertificates(data);

    } catch (error) {

      setCertificateError(
        error.message
      );

    } finally {

      setLoadingCertificates(false);
    }
  };


  // =========================================
  // VIEW SINGLE CERTIFICATE
  // =========================================

  const handleViewCertificate = async (
    certificateId
  ) => {

    try {

      setCertificateError('');

      const response = await fetch(
        `http://localhost:8080/api/student/certificates/${certificateId}?studentId=${studentId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to load certificate'
        );
      }

      setSelectedCertificate(
        data
      );

    } catch (error) {

      setCertificateError(
        error.message
      );
    }
  };


  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // =========================================
  // REGISTER FOR EVENT
  // =========================================

  const handleRegister = async (
    eventId
  ) => {

    try {

      setRegisteringEventId(
        eventId
      );

      setError('');
      setSuccessMessage('');

      const response = await fetch(
        `http://localhost:8080/api/student/registrations?studentId=${studentId}&eventId=${eventId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to register for the event'
        );
      }

      setSuccessMessage(
        `Successfully registered for "${data.eventName}"`
      );

    } catch (error) {

      setError(
        error.message
      );

    } finally {

      setRegisteringEventId(
        null
      );
    }
  };


  // =========================================
  // MY REGISTRATIONS
  // =========================================

  const handleMyRegistrations = async () => {

    setShowRegistrations(true);
    setShowCertificates(false);
    setCertificateError('');

    await loadRegistrations();
  };


  // =========================================
  // CANCEL REGISTRATION
  // =========================================

  const handleCancelRegistration = async (
    registrationId
  ) => {

    const confirmed =
      window.confirm(
        'Are you sure you want to cancel this registration?'
      );

    if (!confirmed) {
      return;
    }

    try {

      setCancellingRegistrationId(
        registrationId
      );

      setRegistrationError('');
      setSuccessMessage('');

      const response = await fetch(
        `http://localhost:8080/api/student/registrations/${registrationId}?studentId=${studentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to cancel registration'
        );
      }

      setSuccessMessage(
        'Registration cancelled successfully.'
      );

      await loadRegistrations();

    } catch (error) {

      setRegistrationError(
        error.message
      );

    } finally {

      setCancellingRegistrationId(
        null
      );
    }
  };


  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="dashboard-page">

      <div className="container dashboard-content">


        {/* =========================================
            HEADER
        ========================================= */}

        <div className="dashboard-header">

          <p className="dashboard-label">
            COLLEGE EVENT MANAGEMENT
          </p>

          <h1>
            Student Dashboard
          </h1>

          <p>
            Welcome to Student Portal
          </p>

          <div className="dashboard-header-buttons">

            {/* BROWSE EVENTS */}

            <button
              type="button"
              className="primary-btn create-event-toggle"
              onClick={() => {

                setShowRegistrations(false);
                setShowCertificates(false);
                setCertificateError('');

                loadEvents();

              }}
            >
              Browse Events
            </button>


            {/* MY REGISTRATIONS */}

            <button
              type="button"
              className="secondary-btn"
              onClick={
                handleMyRegistrations
              }
            >
              My Registrations
            </button>


            {/* MY CERTIFICATES */}

            <button
              type="button"
              className="secondary-btn"
              onClick={() => {

                setShowRegistrations(false);
                setShowCertificates(true);

                loadCertificates();

              }}
            >
              🎓 My Certificates
            </button>


            {/* LOGOUT */}

            <Link
              to="/"
              className="btn btn-outline-danger logout-btn"
            >
              Logout
            </Link>

          </div>

        </div>


        {/* =========================================
            SUCCESS MESSAGE
        ========================================= */}

        {successMessage && (

          <div className="alert alert-success mb-4">

            {successMessage}

          </div>

        )}


        {/* =========================================
            GENERAL ERROR
        ========================================= */}

        {error && (

          <div className="alert alert-danger mb-4">

            {error}

          </div>

        )}


        {/* =========================================
            AVAILABLE EVENTS
        ========================================= */}

        {!showRegistrations &&
          !showCertificates && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                DISCOVER & PARTICIPATE
              </p>

              <h2>
                Available Events
              </h2>

              <div className="heading-line"></div>

            </div>


            <div className="text-end mb-4">

              <button
                className="btn btn-outline-primary"
                onClick={loadEvents}
              >
                Refresh
              </button>

            </div>


            {/* LOADING */}

            {loading && (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                </div>

                <p className="mt-3">
                  Loading events...
                </p>

              </div>

            )}


            {/* NO EVENTS */}

            {!loading &&
              events.length === 0 && (

              <div className="empty-events">

                <h3>
                  No Events Available
                </h3>

                <p>
                  New college events will appear here
                  when they are created.
                </p>

              </div>

            )}


            {/* EVENTS */}

            {!loading &&
              events.length > 0 && (

              <div className="row g-4">

                {events.map(
                  (event) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={event.eventId}
                  >

                    <div className="event-card">


                      {/* CARD HEADER */}

                      <div className="event-card-header">

                        <span className="event-badge">
                          EVENT
                        </span>

                        <span>
                          #{event.eventId}
                        </span>

                      </div>


                      {/* EVENT NAME */}

                      <h3>
                        {event.name}
                      </h3>


                      {/* DESCRIPTION */}

                      <p className="event-description">
                        {event.description}
                      </p>


                      {/* EVENT DETAILS */}

                      <div className="event-details">


                        {/* DATE */}

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


                        {/* TIME */}

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


                        {/* VENUE */}

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


                        {/* CAPACITY */}

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


                      {/* REGISTER BUTTON */}

                      <div className="event-actions">

                        <button
                          className="primary-btn"
                          type="button"
                          onClick={() =>
                            handleRegister(
                              event.eventId
                            )
                          }
                          disabled={
                            registeringEventId ===
                            event.eventId
                          }
                        >

                          {registeringEventId ===
                          event.eventId
                            ? 'Registering...'
                            : 'Register Now'}

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

              </div>

            )}

          </div>

        )}


        {/* =========================================
            MY REGISTRATIONS
        ========================================= */}

        {showRegistrations &&
          !showCertificates && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                YOUR PARTICIPATION
              </p>

              <h2>
                My Registrations
              </h2>

              <div className="heading-line"></div>

            </div>


            {/* REGISTRATION ERROR */}

            {registrationError && (

              <div className="alert alert-danger mb-4">

                {registrationError}

              </div>

            )}


            {/* LOADING */}

            {loadingRegistrations && (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                </div>

                <p className="mt-3">
                  Loading your registrations...
                </p>

              </div>

            )}


            {/* NO REGISTRATIONS */}

            {!loadingRegistrations &&
              !registrationError &&
              registrations.length === 0 && (

              <div className="empty-events">

                <h3>
                  No Registrations Yet
                </h3>

                <p>
                  You have not registered for any
                  events yet.
                </p>

              </div>

            )}


            {/* REGISTRATION CARDS */}

            {!loadingRegistrations &&
              registrations.length > 0 && (

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


                      {/* CARD HEADER */}

                      <div className="event-card-header">

                        <span className="event-badge">
                          {registration.status}
                        </span>

                        <span>
                          #{registration.eventId}
                        </span>

                      </div>


                      {/* EVENT NAME */}

                      <h3>
                        {registration.eventName}
                      </h3>


                      {/* DESCRIPTION */}

                      {registration.eventDescription && (

                        <p className="event-description">

                          {registration.eventDescription}

                        </p>

                      )}


                      {/* DETAILS */}

                      <div className="event-details">


                        {/* DATE */}

                        <div>

                          <span className="detail-icon">
                            📅
                          </span>

                          <div className="detail-content">

                            <strong>
                              DATE
                            </strong>

                            <span>
                              {registration.eventDate}
                            </span>

                          </div>

                        </div>


                        {/* TIME */}

                        <div>

                          <span className="detail-icon">
                            ⏰
                          </span>

                          <div className="detail-content">

                            <strong>
                              TIME
                            </strong>

                            <span>
                              {registration.eventTime}
                            </span>

                          </div>

                        </div>


                        {/* VENUE */}

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


                        {/* REGISTERED ON */}

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


                      {/* CANCEL */}

                      {registration.status ===
                        'REGISTERED' && (

                        <div className="event-actions">

                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() =>
                              handleCancelRegistration(
                                registration.registrationId
                              )
                            }
                            disabled={
                              cancellingRegistrationId ===
                              registration.registrationId
                            }
                          >

                            {cancellingRegistrationId ===
                            registration.registrationId
                              ? 'Cancelling...'
                              : 'Cancel Registration'}

                          </button>

                        </div>

                      )}

                    </div>

                  </div>

                )
              )}

              </div>

            )}

          </div>

        )}


        {/* =========================================
            MY CERTIFICATES
        ========================================= */}

        {showCertificates && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                YOUR ACHIEVEMENTS
              </p>

              <h2>
                My Certificates
              </h2>

              <div className="heading-line"></div>

            </div>


            {/* REFRESH */}

            <div className="text-end mb-4">

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={
                  loadCertificates
                }
              >
                Refresh
              </button>

            </div>


            {/* CERTIFICATE ERROR */}

            {certificateError && (

              <div className="alert alert-danger mb-4">

                {certificateError}

              </div>

            )}


            {/* LOADING */}

            {loadingCertificates && (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                </div>

                <p className="mt-3">
                  Loading your certificates...
                </p>

              </div>

            )}


            {/* NO CERTIFICATES */}

            {!loadingCertificates &&
              !certificateError &&
              certificates.length === 0 && (

              <div className="empty-events">

                <h3>
                  No Certificates Yet
                </h3>

                <p>
                  Certificates generated for your
                  completed events will appear here.
                </p>

              </div>

            )}


            {/* CERTIFICATE CARDS */}

            {!loadingCertificates &&
              certificates.length > 0 && (

              <div className="row g-4">

                {certificates.map(
                  (certificate) => (

                  <div
                    className="col-md-6 col-lg-4"
                    key={
                      certificate.certificateId
                    }
                  >

                    <div className="event-card">


                      {/* CARD HEADER */}

                      <div className="event-card-header">

                        <span className="event-badge">
                          CERTIFICATE
                        </span>

                        <span>
                          #{certificate.certificateId}
                        </span>

                      </div>


                      {/* EVENT NAME */}

                      <h3>
                        {certificate.eventName}
                      </h3>


                      {/* CERTIFICATE DETAILS */}

                      <div className="event-details">


                        {/* CERTIFICATE NUMBER */}

                        <div>

                          <span className="detail-icon">
                            🎓
                          </span>

                          <div className="detail-content">

                            <strong>
                              CERTIFICATE NO.
                            </strong>

                            <span>
                              {
                                certificate.certificateNumber
                              }
                            </span>

                          </div>

                        </div>


                        {/* EVENT DATE */}

                        <div>

                          <span className="detail-icon">
                            📅
                          </span>

                          <div className="detail-content">

                            <strong>
                              EVENT DATE
                            </strong>

                            <span>
                              {
                                certificate.eventDate
                              }
                            </span>

                          </div>

                        </div>


                        {/* ISSUE DATE */}

                        <div>

                          <span className="detail-icon">
                            🕒
                          </span>

                          <div className="detail-content">

                            <strong>
                              ISSUE DATE
                            </strong>

                            <span>

                              {certificate.issueDate
                                ? new Date(
                                    certificate.issueDate
                                  ).toLocaleDateString()
                                : 'N/A'}

                            </span>

                          </div>

                        </div>


                        {/* AICTE POINTS */}

                        <div>

                          <span className="detail-icon">
                            ⭐
                          </span>

                          <div className="detail-content">

                            <strong>
                              AICTE POINTS
                            </strong>

                            <span>
                              {
                                certificate.aictePoints
                              }
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* VIEW CERTIFICATE */}

                      <div className="event-actions">

                        <button
                          type="button"
                          className="primary-btn"
                          onClick={() =>
                            handleViewCertificate(
                              certificate.certificateId
                            )
                          }
                        >
                          🎓 View Certificate
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

              </div>

            )}

          </div>

        )}


        {/* =========================================
            CERTIFICATE PREVIEW
        ========================================= */}

        {selectedCertificate && (

          <CertificatePreview
            certificate={
              selectedCertificate
            }
            onClose={() =>
              setSelectedCertificate(
                null
              )
            }
          />

        )}

      </div>

    </div>

  );
}

export default StudentDashboard;
