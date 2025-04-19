document.querySelectorAll("a.nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
    // Update URL hash without scrolling
    history.pushState(null, null, targetId);
  });
});

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse.classList.contains("show")) {
      const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
      bootstrapCollapse.hide();
    }
  });
});

// Pop-up functionality
document.addEventListener("DOMContentLoaded", function () {
  // Use fetch to load the config file (works with HTTP server)
  fetch("popup-config.json")
    .then((response) => response.json())
    .then((popupConfig) => {
      // Verifică data curentă cu data de start din configurație
      const today = new Date();
      const startDate = new Date(popupConfig.startDate);

      if (today >= startDate) {
        showPopup(popupConfig);
      }
    })
    .catch((error) => {
      console.error("Error loading popup configuration:", error);
    });
});

function showPopup(config) {
  // Creează containerul popup
  const popup = document.createElement("div");
  popup.className = "popup-container";

  // Creează conținutul popup
  const popupContent = document.createElement("div");
  popupContent.className = "popup-content";

  // Creează butonul de închidere
  const closeButton = document.createElement("button");
  closeButton.className = "popup-close";
  closeButton.innerHTML = "&times;";
  closeButton.addEventListener("click", function () {
    document.body.removeChild(popup);
  });

  // Creează mesajul popup
  const message = document.createElement("div");
  message.className = "popup-message";

  // Adaugă titlul
  const title = document.createElement("h3");
  title.textContent = config.title;
  message.appendChild(title);

  // Adaugă paragrafele de conținut
  config.content.forEach((item) => {
    const paragraph = document.createElement("p");

    if (item.text) {
      // Adaugă textul cu emfază dacă începe cu ghilimele
      if (item.text.startsWith("„")) {
        const em = document.createElement("em");
        em.textContent = item.text;
        paragraph.appendChild(em);
      } else {
        paragraph.textContent = item.text;
      }
    }

    // Adaugă referința biblică dacă există
    if (item.reference) {
      const referenceSpan = document.createElement("span");
      referenceSpan.textContent = ` (${item.reference})`;
      paragraph.appendChild(referenceSpan);
    }

    message.appendChild(paragraph);
  });

  // Asamblează popup-ul
  popupContent.appendChild(closeButton);
  popupContent.appendChild(message);
  popup.appendChild(popupContent);

  // Adaugă popup-ul în pagină
  document.body.appendChild(popup);
}
