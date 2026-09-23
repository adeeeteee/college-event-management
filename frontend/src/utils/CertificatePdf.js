import jsPDF from 'jspdf';

export const downloadCertificatePdf = (certificate) => {

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // =========================================
  // BACKGROUND
  // =========================================

  pdf.setFillColor(248, 247, 255);

  pdf.rect(
    0,
    0,
    pageWidth,
    pageHeight,
    'F'
  );

  // =========================================
  // OUTER BORDER
  // =========================================

  pdf.setDrawColor(91, 75, 190);
  pdf.setLineWidth(2);

  pdf.rect(
    8,
    8,
    pageWidth - 16,
    pageHeight - 16
  );

  // =========================================
  // INNER BORDER
  // =========================================

  pdf.setDrawColor(180, 168, 245);
  pdf.setLineWidth(0.6);

  pdf.rect(
    13,
    13,
    pageWidth - 26,
    pageHeight - 26
  );

  // =========================================
  // HEADER / COLLEGE SYSTEM
  // =========================================

  pdf.setTextColor(91, 75, 190);

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(11);

  pdf.text(
    'COLLEGE EVENT MANAGEMENT',
    pageWidth / 2,
    28,
    {
      align: 'center'
    }
  );

  // =========================================
  // DECORATIVE LINE
  // =========================================

  pdf.setDrawColor(91, 75, 190);
  pdf.setLineWidth(0.8);

  pdf.line(
    105,
    34,
    192,
    34
  );

  // =========================================
  // MAIN TITLE
  // =========================================

  pdf.setTextColor(35, 32, 65);

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(25);

  pdf.text(
    'CERTIFICATE OF PARTICIPATION',
    pageWidth / 2,
    52,
    {
      align: 'center'
    }
  );

  // =========================================
  // PRESENTED TO
  // =========================================

  pdf.setTextColor(100, 97, 120);

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.setFontSize(11);

  pdf.text(
    'This certificate is proudly presented to',
    pageWidth / 2,
    68,
    {
      align: 'center'
    }
  );

  // =========================================
  // STUDENT NAME
  // =========================================

  pdf.setTextColor(48, 40, 115);

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(25);

  pdf.text(
    certificate.studentName || 'Student',
    pageWidth / 2,
    84,
    {
      align: 'center'
    }
  );

  // =========================================
  // STUDENT NAME UNDERLINE
  // =========================================

  pdf.setDrawColor(130, 115, 220);
  pdf.setLineWidth(0.7);

  pdf.line(
    82,
    89,
    215,
    89
  );

  // =========================================
  // PARTICIPATION MESSAGE
  // =========================================

  pdf.setTextColor(85, 82, 105);

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.setFontSize(11);

  pdf.text(
    'for successfully participating in',
    pageWidth / 2,
    102,
    {
      align: 'center'
    }
  );

  // =========================================
  // EVENT NAME
  // =========================================

  pdf.setTextColor(35, 32, 65);

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(17);

  const eventName =
    certificate.eventName ||
    'College Event';

  pdf.text(
    eventName,
    pageWidth / 2,
    115,
    {
      align: 'center'
    }
  );

  // =========================================
  // EVENT DATE
  // =========================================

  pdf.setTextColor(95, 92, 115);

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.setFontSize(10);

  const eventDate =
    certificate.eventDate || '-';

  pdf.text(
    `Date: ${eventDate}`,
    pageWidth / 2,
    128,
    {
      align: 'center'
    }
  );

  // =========================================
  // EVENT VENUE
  // =========================================

  pdf.text(
    `Venue: ${certificate.eventVenue || '-'}`,
    pageWidth / 2,
    136,
    {
      align: 'center'
    }
  );

  // =========================================
  // AICTE POINTS BOX
  // =========================================

  pdf.setFillColor(
    238,
    234,
    255
  );

  pdf.setDrawColor(
    115,
    96,
    205
  );

  pdf.setLineWidth(0.8);

  pdf.roundedRect(
    115,
    145,
    67,
    27,
    4,
    4,
    'FD'
  );

  pdf.setTextColor(
    91,
    75,
    190
  );

  pdf.setFont(
    'helvetica',
    'bold'
  );

  pdf.setFontSize(8);

  pdf.text(
    'AICTE POINTS',
    pageWidth / 2,
    153,
    {
      align: 'center'
    }
  );

  pdf.setTextColor(
    45,
    38,
    105
  );

  pdf.setFontSize(17);

  pdf.text(
    String(
      certificate.aictePoints || 15
    ),
    pageWidth / 2,
    165,
    {
      align: 'center'
    }
  );

  // =========================================
  // CERTIFICATE ID
  // =========================================

  pdf.setTextColor(
    110,
    107,
    125
  );

  pdf.setFont(
    'helvetica',
    'normal'
  );

  pdf.setFontSize(8);

  pdf.text(
    `Certificate ID: ${
      certificate.certificateNumber || '-'
    }`,
    22,
    187
  );

  // =========================================
  // ISSUE DATE
  // =========================================

  const issueDate =
    certificate.issueDate
      ? certificate.issueDate.substring(
          0,
          10
        )
      : '-';

  pdf.text(
    `Issued: ${issueDate}`,
    22,
    194
  );

  // =========================================
  // SIGNATURE LINES
  // =========================================

  pdf.setDrawColor(
    100,
    97,
    120
  );

  pdf.setLineWidth(0.5);

  pdf.line(
    205,
    184,
    250,
    184
  );

  pdf.line(
    252,
    184,
    282,
    184
  );

  pdf.setTextColor(
    80,
    77,
    100
  );

  pdf.setFontSize(8);

  pdf.text(
    'Event Coordinator',
    227.5,
    190,
    {
      align: 'center'
    }
  );

  pdf.text(
    'Authorized Signatory',
    267,
    190,
    {
      align: 'center'
    }
  );

  // =========================================
  // DOWNLOAD FILE
  // =========================================

  const safeStudentName =
    (
      certificate.studentName ||
      'Student'
    ).replace(
      /[^a-z0-9]/gi,
      '_'
    );

  const safeEventName =
    (
      certificate.eventName ||
      'Event'
    ).replace(
      /[^a-z0-9]/gi,
      '_'
    );

  pdf.save(
    `Certificate_${safeStudentName}_${safeEventName}.pdf`
  );
};