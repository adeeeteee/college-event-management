import { downloadCertificatePdf } from '../utils/CertificatePdf.js';

function CertificatePreview({
  certificate,
  onClose
}) {

  if (!certificate) {
    return null;
  }

  const issueDate =
    certificate.issueDate
      ? certificate.issueDate.substring(0, 10)
      : '-';

  return (
    <div className="certificate-modal-overlay">

      <div className="certificate-modal">

        {/* =====================================
            MODAL HEADER
        ===================================== */}

        <div className="certificate-modal-header">

          <div>
            <p className="certificate-modal-label">
              CERTIFICATE
            </p>

            <h2>
              Certificate Preview
            </h2>
          </div>

          <button
            type="button"
            className="certificate-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {/* =====================================
            CERTIFICATE PAPER
        ===================================== */}

        <div className="certificate-paper">

          <div className="certificate-inner">

            {/* College / System Name */}

            <div className="certificate-brand">
              COLLEGE EVENT MANAGEMENT
            </div>

            <div className="certificate-small-line"></div>

            {/* Main Title */}

            <h1>
              CERTIFICATE OF PARTICIPATION
            </h1>

            {/* Presented Text */}

            <p className="certificate-presented">
              This certificate is proudly presented to
            </p>

            {/* Student Name */}

            <h2 className="certificate-student-name">
              {certificate.studentName}
            </h2>

            <div className="certificate-name-line"></div>

            {/* Participation Text */}

            <p className="certificate-participation">
              for successfully participating in
            </p>

            {/* Event Name */}

            <h3 className="certificate-event-name">
              {certificate.eventName}
            </h3>

            {/* Event Details */}

            <div className="certificate-details">

              <div>
                <span>
                  DATE
                </span>

                <strong>
                  {certificate.eventDate}
                </strong>
              </div>

              <div>
                <span>
                  VENUE
                </span>

                <strong>
                  {certificate.eventVenue}
                </strong>
              </div>

            </div>

            {/* =================================
                AICTE POINTS
            ================================= */}

            <div className="certificate-aicte">

              <span>
                AICTE POINTS
              </span>

              <strong>
                {certificate.aictePoints}
              </strong>

            </div>

            {/* =================================
                BOTTOM INFORMATION
            ================================= */}

            <div className="certificate-bottom">

              <div>

                <span>
                  CERTIFICATE ID
                </span>

                <strong>
                  {certificate.certificateNumber}
                </strong>

              </div>

              <div>

                <span>
                  ISSUE DATE
                </span>

                <strong>
                  {issueDate}
                </strong>

              </div>

            </div>

            {/* =================================
                SIGNATURES
            ================================= */}

            <div className="certificate-signatures">

              <div>

                <div className="signature-line"></div>

                <span>
                  Event Coordinator
                </span>

              </div>

              <div>

                <div className="signature-line"></div>

                <span>
                  Authorized Signatory
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            ACTION BUTTONS
        ===================================== */}

        <div className="certificate-modal-actions">

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Close
          </button>

          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              downloadCertificatePdf(
                certificate
              )
            }
          >
            ↓ Download Certificate
          </button>

        </div>

      </div>

    </div>
  );
}

export default CertificatePreview;