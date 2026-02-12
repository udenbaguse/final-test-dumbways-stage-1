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
        message: "Semua field wajib diisi.",
      });
      return;
    }

    if (!emailRegex.test(email)) {
      showAlert({
        alertBox,
        type: "danger",
        message: "Format email tidak valid.",
      });
      return;
    }

    showAlert({
      alertBox,
      type: "success",
      message: `Pesan berhasil dikirim. Terima kasih, ${name}!`,
    });

    contactForm.reset();
  });
}
