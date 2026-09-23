import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CertificatePreview from '../components/CertificatePreview';

function CoordinatorDashboard() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    capacity: ''
  });

  const [editingEvent, setEditingEvent] = useState(null);
  const [updating, setUpdating] = useState(false);

  // =========================================
  // PARTICIPANT MANAGEMENT
  // =========================================

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] =
    useState(false);
  const [participantError, setParticipantError] =
    useState('');

  // =========================================
  // ATTENDANCE MANAGEMENT
  // =========================================

  const [attendanceStatus, setAttendanceStatus] =
    useState({});

  const [markingAttendance, setMarkingAttendance] =
    useState(null);

  // =========================================
  // CERTIFICATE MANAGEMENT
  // =========================================

  const [generatingCertificate, setGeneratingCertificate] =
    useState(null);

  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  const coordinatorName =
    localStorage.getItem('name') || 'Coordinator';

  const coordinatorId =
    localStorage.getItem('userId');

  const token =
    localStorage.getItem('token');

  // ================================
  // LOAD EVENTS
  // ================================

  const loadEvents = async () => {

    try {

      setLoading(true);
      setError('');

      const response = await fetch(
        `http://localhost:8080/api/coordinator/events?coordinatorId=${coordinatorId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Unable to load events');
      }

      const data = await response.json();

      setEvents(data);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ================================
  // FORM CHANGE
  // ================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================================
  // CREATE EVENT
  // ================================

  const handleCreateEvent = async (e) => {

    e.preventDefault();

    try {

      setError('');

      const response = await fetch(
        `http://localhost:8080/api/coordinator/events?coordinatorId=${coordinatorId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            date: formData.date,
            time: formData.time,
            venue: formData.venue,
            capacity: Number(formData.capacity)
          })
        }
      );

      if (!response.ok) {
        throw new Error('Unable to create event');
      }

      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        capacity: ''
      });

      setShowCreateForm(false);

      await loadEvents();

    } catch (error) {

      setError(error.message);
    }
  };

  // ================================
  // EDIT EVENT
  // ================================

  const handleEditEvent = (event) => {

    setEditingEvent(event);
    setShowCreateForm(true);

    setFormData({
      name: event.name || '',
      description: event.description || '',
      date: event.date || '',
      time: event.time || '',
      venue: event.venue || '',
      capacity: event.capacity || ''
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // ================================
  // CANCEL FORM
  // ================================

  const handleCancelForm = () => {

    setEditingEvent(null);
    setShowCreateForm(false);

    setFormData({
      name: '',
      description: '',
      date: '',
      time: '',
      venue: '',
      capacity: ''
    });
  };

  // ================================
  // UPDATE EVENT
  // ================================

  const handleUpdateEvent = async (e) => {

    e.preventDefault();

    if (!editingEvent) {
      return;
    }

    try {

      setUpdating(true);
      setError('');

      const response = await fetch(
        `http://localhost:8080/api/coordinator/events/${editingEvent.eventId}?coordinatorId=${coordinatorId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            date: formData.date,
            time: formData.time,
            venue: formData.venue,
            capacity: Number(formData.capacity)
          })
        }
      );

      if (!response.ok) {
        throw new Error('Unable to update event');
      }

      setEditingEvent(null);
      setShowCreateForm(false);

      setFormData({
        name: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        capacity: ''
      });

      await loadEvents();

    } catch (error) {

      setError(error.message);

    } finally {

      setUpdating(false);
    }
  };

  // ================================
  // CANCEL EVENT
  // ================================

  const handleCancelEvent = async (eventId) => {

    const confirmed = window.confirm(
      'Are you sure you want to cancel this event?'
    );

    if (!confirmed) {
      return;
    }

    try {

      setError('');

      const response = await fetch(
        `http://localhost:8080/api/coordinator/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Unable to cancel event');
      }

      setEvents((currentEvents) =>
        currentEvents.filter(
          (event) => event.eventId !== eventId
        )
      );

    } catch (error) {

      setError(error.message);
    }
  };

  // =========================================
  // VIEW PARTICIPANTS + LOAD ATTENDANCE
  // =========================================

  const handleViewParticipants = async (event) => {

    try {

      setSelectedEvent(event);
      setParticipants([]);
      setParticipantError('');
      setLoadingParticipants(true);

      // =========================================
      // LOAD PARTICIPANTS
      // =========================================

      const participantsResponse = await fetch(
        `http://localhost:8080/api/coordinator/events/${event.eventId}/participants?coordinatorId=${coordinatorId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const participantsData =
        await participantsResponse.json();

      if (!participantsResponse.ok) {

        throw new Error(
          participantsData.message ||
          'Unable to load participants'
        );
      }

      setParticipants(participantsData);

      // =========================================
      // LOAD SAVED ATTENDANCE
      // =========================================

      const attendanceResponse = await fetch(
        `http://localhost:8080/api/coordinator/events/${event.eventId}/attendance?coordinatorId=${coordinatorId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const attendanceData =
        await attendanceResponse.json();

      if (!attendanceResponse.ok) {

        throw new Error(
          attendanceData.message ||
          'Unable to load attendance'
        );
      }

      // =========================================
      // CREATE ATTENDANCE STATUS MAP
      // =========================================

      const attendanceMap = {};

      attendanceData.forEach((attendance) => {

        attendanceMap[
          attendance.registrationId
        ] = attendance.status;

      });

      setAttendanceStatus(attendanceMap);

    } catch (error) {

      setParticipantError(
        error.message
      );

    } finally {

      setLoadingParticipants(false);

    }
  };

  // =========================================
  // MARK ATTENDANCE
  // =========================================

  const handleMarkAttendance = async (
    participant,
    status
  ) => {

    try {

      setMarkingAttendance(
        participant.registrationId
      );

      setParticipantError('');

      const response = await fetch(
        `http://localhost:8080/api/coordinator/events/${participant.eventId}/attendance/${participant.registrationId}?coordinatorId=${coordinatorId}&status=${status}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          'Unable to mark attendance'
        );
      }

      /*
       * Store the latest attendance status
       * for this participant.
       */

      setAttendanceStatus((current) => ({
        ...current,
        [participant.registrationId]:
          data.status
      }));

    } catch (error) {

      setParticipantError(error.message);

    } finally {

      setMarkingAttendance(null);
    }
  };

  // =========================================
// GENERATE / VIEW CERTIFICATE
// =========================================

const handleGenerateCertificate = async (
  participant
) => {

  try {

    setGeneratingCertificate(
      participant.registrationId
    );

    setParticipantError('');

    // =========================================
    // STEP 1: TRY TO GENERATE CERTIFICATE
    // =========================================

    const generateResponse = await fetch(
      `http://localhost:8080/api/coordinator/events/${participant.eventId}/certificates/${participant.registrationId}?coordinatorId=${coordinatorId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const generateData =
      await generateResponse.json();

    // =========================================
    // CASE 1:
    // CERTIFICATE GENERATED SUCCESSFULLY
    // =========================================

    if (generateResponse.ok) {

      setSelectedCertificate(
        generateData
      );

      return;
    }

    // =========================================
    // CASE 2:
    // CERTIFICATE ALREADY EXISTS
    // =========================================

    if (
      generateData.message ===
      'Certificate already exists for this student and event'
    ) {

      // -----------------------------------------
      // GET EXISTING CERTIFICATE
      // -----------------------------------------

      const existingResponse = await fetch(
        `http://localhost:8080/api/coordinator/events/${participant.eventId}/certificates/${participant.registrationId}?coordinatorId=${coordinatorId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const existingData =
        await existingResponse.json();

      // -----------------------------------------
      // CHECK GET RESPONSE
      // -----------------------------------------

      if (!existingResponse.ok) {

        throw new Error(
          existingData.message ||
          'Unable to retrieve existing certificate'
        );
      }

      // -----------------------------------------
      // OPEN EXISTING CERTIFICATE
      // -----------------------------------------

      setSelectedCertificate(
        existingData
      );

      return;
    }

    // =========================================
    // OTHER BACKEND ERRORS
    // =========================================

    throw new Error(
      generateData.message ||
      'Unable to generate certificate'
    );

  } catch (error) {

    setParticipantError(
      error.message
    );

  } finally {

    setGeneratingCertificate(null);
  }
};

  // =========================================
  // BACK TO EVENTS
  // =========================================

  const handleBackToEvents = () => {

    setSelectedEvent(null);
    setParticipants([]);
    setParticipantError('');
    setAttendanceStatus({});
  };

  // ================================
  // RENDER
  // ================================

  return (
    <div className="dashboard-page">

      <div className="container dashboard-content">

        {/* ============================
            HEADER
        ============================ */}

        <div className="dashboard-header">

          <p className="dashboard-label">
            COLLEGE EVENT MANAGEMENT
          </p>

          <h1>
            Coordinator Dashboard
          </h1>

          <p>
            Welcome, {coordinatorName}
          </p>

          <div className="dashboard-header-buttons">

            <button
              type="button"
              className="primary-btn create-event-toggle"
              onClick={() => {

                setSelectedEvent(null);
                setEditingEvent(null);
                setShowCreateForm(true);

                setFormData({
                  name: '',
                  description: '',
                  date: '',
                  time: '',
                  venue: '',
                  capacity: ''
                });

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              + Create Event
            </button>

            <Link
              to="/"
              className="btn btn-outline-danger logout-btn"
            >
              Logout
            </Link>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="alert alert-danger mb-4">
            {error}
          </div>
        )}

        {/* ============================
            CREATE / EDIT FORM
        ============================ */}

        {showCreateForm && (

          <div className="create-event-container">

            <div className="create-event-card">

              <div className="create-event-header">

                <div>

                  <h2>
                    {editingEvent
                      ? 'Edit Event'
                      : 'Create New Event'}
                  </h2>

                  <p>
                    {editingEvent
                      ? 'Update the event details below.'
                      : 'Add a new event for students to participate in.'}
                  </p>

                </div>

                <button
                  type="button"
                  className="close-form-btn"
                  onClick={handleCancelForm}
                >
                  ×
                </button>

              </div>

              <form
                onSubmit={
                  editingEvent
                    ? handleUpdateEvent
                    : handleCreateEvent
                }
              >

                <div className="form-field">

                  <label>
                    Event Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter event name"
                    required
                  />

                </div>

                <div className="form-row">

                  <div className="form-field">

                    <label>
                      Date
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="form-field">

                    <label>
                      Time
                    </label>

                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="form-row">

                  <div className="form-field">

                    <label>
                      Venue
                    </label>

                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Enter venue"
                      required
                    />

                  </div>

                  <div className="form-field">

                    <label>
                      Capacity
                    </label>

                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleChange}
                      placeholder="Maximum participants"
                      min="1"
                      required
                    />

                  </div>

                </div>

                <div className="form-field">

                  <label>
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter event description"
                    required
                  />

                </div>

                <div className="create-event-actions">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="primary-btn"
                    disabled={updating}
                  >
                    {updating
                      ? 'Updating...'
                      : editingEvent
                        ? 'Update Event'
                        : 'Create Event'}
                  </button>

                </div>

              </form>

            </div>

          </div>

        )}

        {/* =====================================
            PARTICIPANTS SECTION
        ===================================== */}

        {selectedEvent && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                EVENT PARTICIPATION
              </p>

              <h2>
                Participants & Attendance
              </h2>

              <div className="heading-line"></div>

            </div>

            {/* EVENT INFORMATION */}

            <div className="event-card mb-4">

              <div className="event-card-header">

                <span className="event-badge">
                  EVENT
                </span>

                <span>
                  #{selectedEvent.eventId}
                </span>

              </div>

              <h3>
                {selectedEvent.name}
              </h3>

              <p className="event-description">
                {selectedEvent.description}
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
                      {selectedEvent.date}
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
                      {selectedEvent.time}
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
                      {selectedEvent.venue}
                    </span>

                  </div>

                </div>

                <div>

                  <span className="detail-icon">
                    👥
                  </span>

                  <div className="detail-content">

                    <strong>
                      REGISTERED
                    </strong>

                    <span>
                      {participants.length}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* BACK BUTTON */}

            <div className="text-end mb-4">

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleBackToEvents}
              >
                ← Back to My Events
              </button>

            </div>

            {/* PARTICIPANT ERROR */}

            {participantError && (

              <div className="alert alert-danger mb-4">
                {participantError}
              </div>

            )}

            {/* LOADING */}

            {loadingParticipants && (

              <div className="text-center py-5">

                <div
                  className="spinner-border text-primary"
                  role="status"
                >
                </div>

                <p className="mt-3">
                  Loading participants...
                </p>

              </div>

            )}

            {/* NO PARTICIPANTS */}

            {!loadingParticipants &&
              !participantError &&
              participants.length === 0 && (

                <div className="empty-events">

                  <h3>
                    No Participants Yet
                  </h3>

                  <p>
                    No students have registered for this
                    event yet.
                  </p>

                </div>

              )}

            {/* PARTICIPANTS */}

            {!loadingParticipants &&
              participants.length > 0 && (

                <div className="row g-4">

                  {participants.map(
                    (participant) => {

                      const currentAttendance =
                        attendanceStatus[
                          participant.registrationId
                        ];

                      return (

                        <div
                          className="col-md-6 col-lg-4"
                          key={participant.registrationId}
                        >

                          <div className="event-card">

                            <div className="event-card-header">

                              <span className="event-badge">
                                PARTICIPANT
                              </span>

                              <span>
                                #{participant.registrationId}
                              </span>

                            </div>

                            <h3>
                              {participant.studentName}
                            </h3>

                            <div className="event-details">

                              <div>

                                <span className="detail-icon">
                                  📝
                                </span>

                                <div className="detail-content">

                                  <strong>
                                    REGISTRATION ID
                                  </strong>

                                  <span>
                                    {participant.registrationId}
                                  </span>

                                </div>

                              </div>

                              <div>

                                <span className="detail-icon">
                                  📅
                                </span>

                                <div className="detail-content">

                                  <strong>
                                    REGISTERED ON
                                  </strong>

                                  <span>
                                    {participant.registrationDate
                                      ? new Date(
                                          participant.registrationDate
                                        ).toLocaleString()
                                      : 'N/A'}
                                  </span>

                                </div>

                              </div>

                              <div>

                                <span className="detail-icon">
                                  ✅
                                </span>

                                <div className="detail-content">

                                  <strong>
                                    REGISTRATION STATUS
                                  </strong>

                                  <span>
                                    {participant.status}
                                  </span>

                                </div>

                              </div>

                              {/* ATTENDANCE */}

                              <div className="attendance-section">

                                <strong className="attendance-title">
                                  ATTENDANCE
                                </strong>

                                <div className="attendance-buttons">

                                  <button
                                    type="button"
                                    className={
                                      currentAttendance ===
                                      'PRESENT'
                                        ? 'btn btn-success'
                                        : 'btn btn-outline-success'
                                    }
                                    onClick={() =>
                                      handleMarkAttendance(
                                        participant,
                                        'PRESENT'
                                      )
                                    }
                                    disabled={
                                      markingAttendance ===
                                      participant.registrationId
                                    }
                                  >
                                    {markingAttendance ===
                                    participant.registrationId
                                      ? 'Saving...'
                                      : 'Present'}
                                  </button>

                                  <button
                                    type="button"
                                    className={
                                      currentAttendance ===
                                      'ABSENT'
                                        ? 'btn btn-danger'
                                        : 'btn btn-outline-danger'
                                    }
                                    onClick={() =>
                                      handleMarkAttendance(
                                        participant,
                                        'ABSENT'
                                      )
                                    }
                                    disabled={
                                      markingAttendance ===
                                      participant.registrationId
                                    }
                                  >
                                    {markingAttendance ===
                                    participant.registrationId
                                      ? 'Saving...'
                                      : 'Absent'}
                                  </button>

                                </div>

                                {currentAttendance && (

                                  <div className="attendance-current">

                                    Current:
                                    {' '}

                                    <strong>
                                      {currentAttendance}
                                    </strong>

                                  </div>

                                )}

                              </div>

                              {/* =========================================
                                  CERTIFICATE
                              ========================================= */}

                              {currentAttendance === 'PRESENT' && (

                                <div className="certificate-section">

                                  <strong className="certificate-section-title">
                                    CERTIFICATE
                                  </strong>

                                  <button
                                    type="button"
                                    className="certificate-generate-btn"
                                    onClick={() =>
                                      handleGenerateCertificate(
                                        participant
                                      )
                                    }
                                    disabled={
                                      generatingCertificate ===
                                      participant.registrationId
                                    }
                                  >
                                    {generatingCertificate ===
                                    participant.registrationId
                                      ? 'Generating...'
                                      : '🎓 Generate Certificate'}
                                  </button>

                                  <div className="certificate-points-hint">
                                    AICTE Points: <strong>15</strong>
                                  </div>

                                </div>

                              )}

                            </div>

                          </div>

                        </div>

                      );
                    }
                  )}

                </div>

              )}

          </div>

        )}

        {/* ============================
            CERTIFICATE PREVIEW
        ============================ */}

        {selectedCertificate && (
          <CertificatePreview
            certificate={selectedCertificate}
            onClose={() =>
              setSelectedCertificate(null)
            }
          />
        )}

        {/* ============================
            EVENTS SECTION
        ============================ */}

        {!selectedEvent && (

          <div className="events-section">

            <div className="section-heading">

              <p>
                MANAGE YOUR EVENTS
              </p>

              <h2>
                My Events
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

            {!loading && events.length === 0 && (

              <div className="empty-events">

                <h3>
                  No Events Yet
                </h3>

                <p>
                  Click "+ Create Event" above to add your first event.
                </p>

              </div>

            )}

            {!loading && events.length > 0 && (

              <div className="row g-4">

                {events.map((event) => (

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

                      {/* ACTION BUTTONS */}

                      <div className="event-actions">

                        <button
                          className="btn btn-outline-primary"
                          onClick={() =>
                            handleViewParticipants(event)
                          }
                        >
                          View Participants
                        </button>

                        <button
                          className="btn btn-outline-primary"
                          onClick={() =>
                            handleEditEvent(event)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-outline-danger"
                          onClick={() =>
                            handleCancelEvent(event.eventId)
                          }
                        >
                          Cancel Event
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default CoordinatorDashboard;