function doGet() {
  return ContentService.createTextOutput(
    "KGS Media House contact endpoint is active. POST requests are handled by doPost."
  ).setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var parameters = e && e.parameter ? e.parameter : {};
  var inquiry = {
    name: readFormField(parameters, "name"),
    email: readFormField(parameters, "email"),
    phone: readFormField(parameters, "phone"),
    subject: readFormField(parameters, "subject"),
    message: readFormField(parameters, "message")
  };
  var sent = false;

  try {
    if (!inquiry.name || !inquiry.email || !inquiry.subject || !inquiry.message) {
      throw new Error("Name, email, subject, and message are required.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
      throw new Error("A valid email address is required.");
    }

    var emailBody = [
      "You have a new inquiry from your KGS Media House website.",
      "",
      "Name: " + inquiry.name,
      "Email: " + inquiry.email,
      "Phone: " + (inquiry.phone || "Not provided"),
      "Subject: " + inquiry.subject,
      "",
      "Message:",
      inquiry.message
    ].join("\n");

    MailApp.sendEmail({
      to: "satiesh.kg@gmail.com",
      replyTo: inquiry.email,
      subject: "New Website Lead: " + inquiry.subject.replace(/[\r\n]+/g, " ").slice(0, 150),
      body: emailBody
    });
    sent = true;
  } catch (error) {
    console.error("Contact form email failed:", error);
  }

  return createResponsePage(sent);
}

function readFormField(parameters, fieldName) {
  return String(parameters[fieldName] || "").trim();
}

function createResponsePage(sent) {
  var heading = sent ? "Message sent" : "Message not sent";
  var message = sent
    ? "Your inquiry was sent successfully. We will be in touch soon."
    : "We could not send your inquiry. Please email us directly or try again.";
  var background = sent ? "#ecfdf5" : "#fef2f2";
  var border = sent ? "#86efac" : "#fca5a5";
  var color = sent ? "#166534" : "#991b1b";
  var html = "<!doctype html><html><head><meta charset=\"utf-8\">" +
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" +
    "<style>html,body{margin:0;padding:0;background:transparent;font:14px/1.5 Arial,sans-serif}" +
    ".notice{box-sizing:border-box;padding:12px 14px;border:1px solid " + border +
    ";border-radius:8px;background:" + background + ";color:" + color + "}" +
    ".notice strong{display:block;margin-bottom:2px}</style></head><body>" +
    "<div class=\"notice\" role=\"status\"><strong>" + heading + "</strong>" +
    message + "</div></body></html>";

  return HtmlService.createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
