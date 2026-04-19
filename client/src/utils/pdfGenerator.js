import jsPDF from 'jspdf';

export const generateRegistrationsPDF = (event, registrations) => {
  try {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Define colors
    const primaryColor = [99, 102, 241]; // #6366f1
    const darkGray = [50, 50, 50];
    const lightGray = [240, 240, 240];
    const textColor = [40, 40, 40];

    // Set default font
    doc.setFont('helvetica');

    // Header with background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    // White text for header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Event Registrations Report', 15, 20);

    // Reset text color
    doc.setTextColor(...textColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 15, 28);

    // Event Details Section
    let yPosition = 50;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text('Event Details', 15, yPosition);

    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);
    doc.setFontSize(10);

    // Event information
    const eventInfo = [
      { label: 'Event Name:', value: event.title },
      { label: 'Date:', value: event.date ? new Date(event.date).toLocaleDateString() : 'TBA' },
      { label: 'Location:', value: event.location || 'Not specified' },
      { label: 'Total Registrations:', value: registrations.length.toString() },
      { label: 'Unique Participants:', value: new Set(registrations.map(r => r.email)).size.toString() }
    ];

    const labelWidth = 40;
    eventInfo.forEach(info => {
      doc.setFont('helvetica', 'bold');
      doc.text(info.label, 15, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(info.value, 15 + labelWidth, yPosition);
      yPosition += 7;
    });

    // Registrations Table
    yPosition += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...primaryColor);
    doc.text('Registrations', 15, yPosition);

    yPosition += 10;

    // Table headers
    doc.setFillColor(...lightGray);
    doc.rect(15, yPosition - 5, 180, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkGray);
    doc.setFontSize(9);

    const colX = {
      name: 15,
      email: 60,
      phone: 120,
      date: 155
    };

    doc.text('Name', colX.name, yPosition);
    doc.text('Email', colX.email, yPosition);
    doc.text('Phone', colX.phone, yPosition);
    doc.text('Date', colX.date, yPosition);

    yPosition += 8;

    // Table rows
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...textColor);
    doc.setFontSize(8);

    registrations.forEach((reg, index) => {
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;

        // Repeat header on new page
        doc.setFillColor(...lightGray);
        doc.rect(15, yPosition - 5, 180, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...darkGray);
        doc.text('Name', colX.name, yPosition);
        doc.text('Email', colX.email, yPosition);
        doc.text('Phone', colX.phone, yPosition);
        doc.text('Date', colX.date, yPosition);

        yPosition += 8;
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...textColor);
      }

      // Alternate row background
      if (index % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(15, yPosition - 4, 180, 6, 'F');
      }

      // Data
      doc.text(reg.name || 'N/A', colX.name, yPosition);
      
      // Email - truncate if too long
      const email = reg.email || 'N/A';
      const truncatedEmail = email.length > 35 ? email.substring(0, 32) + '...' : email;
      doc.text(truncatedEmail, colX.email, yPosition);
      
      // Phone - truncate if too long
      const phone = reg.phone || 'N/A';
      const truncatedPhone = phone.length > 15 ? phone.substring(0, 12) + '...' : phone;
      doc.text(truncatedPhone, colX.phone, yPosition);
      
      // Date
      const regDate = reg.registeredAt 
        ? new Date(reg.registeredAt).toLocaleDateString() 
        : reg.createdAt 
        ? new Date(reg.createdAt).toLocaleDateString()
        : 'N/A';
      doc.text(regDate, colX.date, yPosition);

      yPosition += 6;
    });

    // Footer
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${totalPages}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
    }

    // Generate filename
    const eventTitle = event.title.replace(/\s+/g, '_').substring(0, 30);
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${eventTitle}_registrations_${timestamp}.pdf`;

    // Save the PDF
    doc.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error: error.message };
  }
};
