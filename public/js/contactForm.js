import { showAlert } from "./utils/alert.js";

const contactForm = document.getElementById("contactForm");
const alertBox = document.getElementById("contactAlert");

if (contactForm && alertBox) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      showAlert({
        alertBox,
        type: "danger",
        message: "all fields are required to be filled in",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      showAlert({
        alertBox,
        type: "danger",
        message: "invalid email format",
      });
      return;
    }

    showAlert({
      alertBox,
      type: "success",
      message: `Message sent successfully. Thank you, ${name}!`,
    });

    contactForm.reset();
  });
}
