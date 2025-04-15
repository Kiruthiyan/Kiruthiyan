
/*==== Form Submission to Google Sheets ====*/
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Replace with your actual Google Apps Script URL
const form = document.getElementById('contactForm');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page refresh

    let formData = new FormData(form);

    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert("Thank you! Your message has been sent successfully.");
            
            // OPTIONAL: Send SMS Notification
            sendSMS(`New Contact from ${formData.get("name")}, Email: ${formData.get("email")}`);
            
            form.reset(); // Clear form after submission
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert("Oops! Something went wrong. Please try again.");
    });
});

/*==== Twilio SMS Alert Function ====*/
function sendSMS(message) {
    const accountSid = "YOUR_TWILIO_SID"; 
    const authToken = "YOUR_TWILIO_AUTH_TOKEN"; 
    const fromNumber = "YOUR_TWILIO_PHONE"; 
    const toNumber = "YOUR_PHONE_NUMBER"; 

    fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(`${accountSid}:${authToken}`),
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "To": toNumber,
            "From": fromNumber,
            "Body": message
        })
    })
    .then(response => response.json())
    .then(data => console.log("SMS Sent:", data))
    .catch(error => console.error("Error sending SMS:", error));
}
